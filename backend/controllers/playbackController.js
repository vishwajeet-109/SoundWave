// controllers/playbackController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import playbackProgressService from "../services/playbackProgressService.js";

export const updateProgress = asyncHandler(async (req, res) => {
  const progress = await playbackProgressService.updateProgress({
    userId: req.user._id,
    songId: req.params.songId,
    positionSeconds: req.body.positionSeconds,
    completed: req.body.completed,
  });
  res.status(200).json(new ApiResponse(200, progress, "Playback progress saved."));
});

export const getProgress = asyncHandler(async (req, res) => {
  const progress = await playbackProgressService.getProgress({
    userId: req.user._id,
    songId: req.params.songId,
  });
  res.status(200).json(new ApiResponse(200, progress, "Playback progress fetched."));
});

export const getContinueListening = asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);
  const items = await playbackProgressService.listInProgress({ userId: req.user._id, limit });
  res.status(200).json(new ApiResponse(200, { items }, "Continue listening list fetched."));
});
