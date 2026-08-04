// services/songApprovalService.js

import mongoose from "mongoose";
import Song from "../models/Song.js";
import ApiError from "../utils/ApiError.js";
import { SONG_STATUS, SONG_STATUS_TRANSITIONS } from "../constants/songStatus.js";
import { AUDIT_ACTIONS, AUDIT_MODULES } from "../constants/auditActions.js";
import { getPaginationParams, buildPaginatedResult } from "../utils/pagination.js";
import auditLogService from "./auditLogService.js";
import notificationService from "./notificationService.js";

/**
 * Ensures a status transition is legal per the workflow map in
 * constants/songStatus.js. Centralizing this avoids duplicated
 * workflow checks across approve/reject/block/unblock.
 */
const assertTransitionAllowed = (currentStatus, nextStatus) => {
  const allowed = SONG_STATUS_TRANSITIONS[currentStatus] || [];
  if (!allowed.includes(nextStatus)) {
    throw new ApiError(
      409,
      `Cannot move song from ${currentStatus} to ${nextStatus}.`
    );
  }
};

const findSongOrThrow = async (songId) => {
  const song = await Song.findById(songId).populate("artist", "name email avatar");
  if (!song) {
    throw new ApiError(404, "Song not found.");
  }
  return song;
};

/**
 * Lists songs filtered by approval status (paginated), with
 * optional text search — used for Pending / Approved / Rejected /
 * Blocked admin tabs.
 */
const listSongsByStatus = async ({ status, search, query }) => {
  const { page, limit, skip } = getPaginationParams(query);

  const filter = {};
  if (status) filter.status = status;
  if (search) {
    filter.$text = { $search: search };
  }

  const [items, total] = await Promise.all([
    Song.find(filter)
      .populate("artist", "name email avatar")
      .populate("genre", "name")
      .populate("category", "name")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Song.countDocuments(filter),
  ]);

  return buildPaginatedResult({ items, total, page, limit });
};

/**
 * Approves a PENDING song. Sets approvedBy/approvedAt, moves to
 * APPROVED, records an audit log, and notifies the artist.
 */
const approveSong = async ({ songId, adminId, note, req }) => {
  const song = await findSongOrThrow(songId);
  assertTransitionAllowed(song.status, SONG_STATUS.APPROVED);

  song.status = SONG_STATUS.APPROVED;
  song.approvedBy = adminId;
  song.approvedAt = new Date();
  song.reviewedBy = adminId;
  song.reviewedAt = new Date();
  song.rejectedReason = null;
  song.blockedReason = null;
  await song.save();

  await auditLogService.recordAuditLog({
    user: adminId,
    action: AUDIT_ACTIONS.SONG_APPROVED,
    module: AUDIT_MODULES.SONGS,
    targetId: song._id,
    details: { note: note || null },
    req,
  });

  await notificationService.sendNotification({
    user: song.artist._id,
    title: "Song Approved",
    message: `Your song "${song.title}" has been approved and is now live.`,
    type: "SONG_APPROVED",
    data: { songId: song._id },
  });

  return song;
};

/**
 * Rejects a PENDING song with a required reason. Artist can revise
 * and resubmit (REJECTED -> PENDING transition is allowed).
 */
const rejectSong = async ({ songId, adminId, reason, req }) => {
  const song = await findSongOrThrow(songId);
  assertTransitionAllowed(song.status, SONG_STATUS.REJECTED);

  song.status = SONG_STATUS.REJECTED;
  song.rejectedReason = reason;
  song.reviewedBy = adminId;
  song.reviewedAt = new Date();
  await song.save();

  await auditLogService.recordAuditLog({
    user: adminId,
    action: AUDIT_ACTIONS.SONG_REJECTED,
    module: AUDIT_MODULES.SONGS,
    targetId: song._id,
    details: { reason },
    req,
  });

  await notificationService.sendNotification({
    user: song.artist._id,
    title: "Song Rejected",
    message: `Your song "${song.title}" was rejected: ${reason}`,
    type: "SONG_REJECTED",
    data: { songId: song._id, reason },
  });

  return song;
};

/**
 * Blocks a song (from APPROVED or elsewhere per transition map),
 * e.g. after a report/policy violation. Removes it from public
 * visibility at the query layer (status filter), audio stays intact.
 */
const blockSong = async ({ songId, adminId, reason, req }) => {
  const song = await findSongOrThrow(songId);
  assertTransitionAllowed(song.status, SONG_STATUS.BLOCKED);

  song.status = SONG_STATUS.BLOCKED;
  song.blockedReason = reason;
  song.reviewedBy = adminId;
  song.reviewedAt = new Date();
  await song.save();

  await auditLogService.recordAuditLog({
    user: adminId,
    action: AUDIT_ACTIONS.SONG_BLOCKED,
    module: AUDIT_MODULES.SONGS,
    targetId: song._id,
    details: { reason },
    req,
  });

  await notificationService.sendNotification({
    user: song.artist._id,
    title: "Song Blocked",
    message: `Your song "${song.title}" has been blocked: ${reason}`,
    type: "SONG_BLOCKED",
    data: { songId: song._id, reason },
  });

  return song;
};

/**
 * Unblocks a previously BLOCKED song back to PENDING for re-review,
 * or directly to APPROVED per the transition map.
 */
const unblockSong = async ({ songId, adminId, req }) => {
  const song = await findSongOrThrow(songId);
  assertTransitionAllowed(song.status, SONG_STATUS.PENDING);

  song.status = SONG_STATUS.PENDING;
  song.blockedReason = null;
  song.reviewedBy = adminId;
  song.reviewedAt = new Date();
  await song.save();

  await auditLogService.recordAuditLog({
    user: adminId,
    action: AUDIT_ACTIONS.SONG_UNBLOCKED,
    module: AUDIT_MODULES.SONGS,
    targetId: song._id,
    details: {},
    req,
  });

  await notificationService.sendNotification({
    user: song.artist._id,
    title: "Song Unblocked",
    message: `Your song "${song.title}" has been unblocked and is pending re-review.`,
    type: "SONG_UNBLOCKED",
    data: { songId: song._id },
  });

  return song;
};

/**
 * Dashboard stats for the admin approval screen — counts per status
 * via a single aggregation instead of N separate count queries.
 */
const getApprovalStats = async () => {
  const results = await Song.aggregate([
    { $group: { _id: "$status", count: { $sum: 1 } } },
  ]);

  const stats = {
    [SONG_STATUS.DRAFT]: 0,
    [SONG_STATUS.PENDING]: 0,
    [SONG_STATUS.APPROVED]: 0,
    [SONG_STATUS.REJECTED]: 0,
    [SONG_STATUS.BLOCKED]: 0,
  };

  results.forEach(({ _id, count }) => {
    if (_id in stats) stats[_id] = count;
  });

  stats.total = Object.values(stats).reduce((sum, n) => sum + n, 0);

  return stats;
};

export default {
  listSongsByStatus,
  approveSong,
  rejectSong,
  blockSong,
  unblockSong,
  getApprovalStats,
};
