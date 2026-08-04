// controllers/adminSongController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import songApprovalService from "../services/songApprovalService.js";
import { SONG_STATUS } from "../constants/songStatus.js";

export const getPendingSongs = asyncHandler(async (req, res) => {
  const result = await songApprovalService.listSongsByStatus({
    status: SONG_STATUS.PENDING,
    search: req.query.search,
    query: req.query,
  });
  res.status(200).json(new ApiResponse(200, "Pending songs fetched successfully.", result));
});

export const getApprovedSongs = asyncHandler(async (req, res) => {
  const result = await songApprovalService.listSongsByStatus({
    status: SONG_STATUS.APPROVED,
    search: req.query.search,
    query: req.query,
  });
  res.status(200).json(new ApiResponse(200, "Approved songs fetched successfully.", result));
});

export const getRejectedSongs = asyncHandler(async (req, res) => {
  const result = await songApprovalService.listSongsByStatus({
    status: SONG_STATUS.REJECTED,
    search: req.query.search,
    query: req.query,
  });
  res.status(200).json(new ApiResponse(200, "Rejected songs fetched successfully.", result));
});

export const getBlockedSongs = asyncHandler(async (req, res) => {
  const result = await songApprovalService.listSongsByStatus({
    status: SONG_STATUS.BLOCKED,
    search: req.query.search,
    query: req.query,
  });
  res.status(200).json(new ApiResponse(200, "Blocked songs fetched successfully.", result));
});

export const approveSong = asyncHandler(async (req, res) => {
  const song = await songApprovalService.approveSong({
    songId: req.params.songId,
    adminId: req.user._id,
    note: req.body.note,
    req,
  });
  res.status(200).json(new ApiResponse(200, "Song approved successfully.", song));
});

export const rejectSong = asyncHandler(async (req, res) => {
  const song = await songApprovalService.rejectSong({
    songId: req.params.songId,
    adminId: req.user._id,
    reason: req.body.reason,
    req,
  });
  res.status(200).json(new ApiResponse(200, "Song rejected successfully.", song));
});

export const blockSong = asyncHandler(async (req, res) => {
  const song = await songApprovalService.blockSong({
    songId: req.params.songId,
    adminId: req.user._id,
    reason: req.body.reason,
    req,
  });
  res.status(200).json(new ApiResponse(200, "Song blocked successfully.", song));
});

export const unblockSong = asyncHandler(async (req, res) => {
  const song = await songApprovalService.unblockSong({
    songId: req.params.songId,
    adminId: req.user._id,
    req,
  });
  res.status(200).json(new ApiResponse(200, "Song unblocked successfully.", song));
});

export const getApprovalStats = asyncHandler(async (req, res) => {
  const stats = await songApprovalService.getApprovalStats();
  res.status(200).json(new ApiResponse(200, "Approval stats fetched successfully.", stats));
});
