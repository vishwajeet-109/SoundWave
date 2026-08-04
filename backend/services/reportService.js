// services/reportService.js

import Report from "../models/Report.js";
import Song from "../models/Song.js";
import ApiError from "../utils/ApiError.js";
import { getPaginationParams, buildPaginatedResult } from "../utils/pagination.js";
import { REPORT_STATUS } from "../constants/reportStatus.js";
import notificationService from "./notificationService.js";
import songApprovalService from "./songApprovalService.js";

// If a song accumulates this many pending reports, it's surfaced
// prominently in the admin reports list/dashboard — this never
// auto-blocks a song on its own, review always stays manual.
const AUTO_FLAG_THRESHOLD = 3;

const createReport = async ({ reporterId, songId, artistId, reason, description }) => {
  if (songId) {
    const song = await Song.findById(songId);
    if (!song) throw new ApiError(404, "Song not found.");
  }

  const existing = await Report.findOne({
    reportedBy: reporterId,
    song: songId || null,
    artist: artistId || null,
    status: REPORT_STATUS.PENDING,
  });
  if (existing) {
    throw new ApiError(409, "You already have a pending report for this item.");
  }

  const report = await Report.create({
    reportedBy: reporterId,
    song: songId || null,
    artist: artistId || null,
    reason,
    description,
  });

  if (songId) {
    await Song.updateOne({ _id: songId }, { $inc: { reportCount: 1 } });
  }

  return report;
};

const listReports = async ({ status, query }) => {
  const { page, limit, skip } = getPaginationParams(query);

  const filter = {};
  if (status) filter.status = status;

  const [items, total] = await Promise.all([
    Report.find(filter)
      .populate("reportedBy", "name email")
      .populate("song", "title slug reportCount status")
      .populate("artist", "name email")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Report.countDocuments(filter),
  ]);

  return buildPaginatedResult({ items, total, page, limit });
};

/**
 * Admin resolves a report. If status is ACTIONED and the report
 * targets a song, the song is blocked via the existing
 * songApprovalService (reused, not duplicated) so the audit-log +
 * notification side effects stay consistent with the normal admin
 * blocking flow.
 */
const reviewReport = async ({ reportId, adminId, status, note, req }) => {
  const report = await Report.findById(reportId);
  if (!report) throw new ApiError(404, "Report not found.");
  if (report.status !== REPORT_STATUS.PENDING) {
    throw new ApiError(409, "This report has already been reviewed.");
  }

  report.status = status;
  report.reviewedBy = adminId;
  report.reviewedAt = new Date();
  await report.save();

  if (status === REPORT_STATUS.ACTIONED && report.song) {
    await songApprovalService.blockSong({
      songId: report.song,
      adminId,
      reason: note || `Blocked following report review (${report.reason}).`,
      req,
    });
  } else if (report.reportedBy) {
    await notificationService.sendNotification({
      user: report.reportedBy,
      title: "Report Reviewed",
      message: `Your report has been reviewed: ${status.toLowerCase()}.`,
      type: "SYSTEM",
      data: { reportId: report._id, status },
    });
  }

  return report;
};

export default { createReport, listReports, reviewReport, AUTO_FLAG_THRESHOLD };
