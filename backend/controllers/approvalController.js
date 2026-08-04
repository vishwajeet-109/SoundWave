import approvalService from "../services/approvalService.js";
import ApiResponse from "../utils/ApiResponse.js";
import asyncHandler from "../utils/asyncHandler.js";

class ApprovalController {
  getPendingSongs = asyncHandler(async (req, res) => {
    const songs = await approvalService.getPendingSongs();
    res.status(200).json(new ApiResponse(200, "Pending songs fetched successfully", songs));
  });

  getApprovedSongs = asyncHandler(async (req, res) => {
    const songs = await approvalService.getApprovedSongs();
    res.status(200).json(new ApiResponse(200, "Approved songs fetched successfully", songs));
  });

  getRejectedSongs = asyncHandler(async (req, res) => {
    const songs = await approvalService.getRejectedSongs();
    res.status(200).json(new ApiResponse(200, "Rejected songs fetched successfully", songs));
  });

  getBlockedSongs = asyncHandler(async (req, res) => {
    const songs = await approvalService.getBlockedSongs();
    res.status(200).json(new ApiResponse(200, "Blocked songs fetched successfully", songs));
  });

  approveSong = asyncHandler(async (req, res) => {
    const song = await approvalService.approveSong(req.params.id, req.user);
    res.status(200).json(new ApiResponse(200, "Song approved successfully", song));
  });

  rejectSong = asyncHandler(async (req, res) => {
    const song = await approvalService.rejectSong(req.params.id, req.body.reason, req.user);
    res.status(200).json(new ApiResponse(200, "Song rejected successfully", song));
  });

  blockSong = asyncHandler(async (req, res) => {
    const song = await approvalService.blockSong(req.params.id, req.user);
    res.status(200).json(new ApiResponse(200, "Song blocked successfully", song));
  });

  getDashboardStats = asyncHandler(async (req, res) => {
    const stats = await approvalService.getDashboardStats();
    res.status(200).json(new ApiResponse(200, "Dashboard statistics fetched successfully", stats));
  });
}

export default new ApprovalController();