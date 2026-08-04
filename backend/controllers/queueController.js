// controllers/queueController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import queueService from "../services/queueService.js";

export const getMyQueue = asyncHandler(async (req, res) => {
  const queue = await queueService.getQueue(req.user._id);
  res.status(200).json(new ApiResponse(200, queue, "Queue fetched successfully."));
});

export const setQueue = asyncHandler(async (req, res) => {
  const queue = await queueService.setQueue({
    userId: req.user._id,
    songIds: req.body.songIds,
    startIndex: req.body.startIndex,
  });
  res.status(200).json(new ApiResponse(200, queue, "Queue set successfully."));
});

export const addToQueue = asyncHandler(async (req, res) => {
  const queue = await queueService.addToQueue({
    userId: req.user._id,
    songId: req.body.songId,
    position: req.body.position,
  });
  res.status(200).json(new ApiResponse(200, queue, "Song added to queue."));
});

export const removeFromQueue = asyncHandler(async (req, res) => {
  const queue = await queueService.removeFromQueue({
    userId: req.user._id,
    index: req.body.index,
  });
  res.status(200).json(new ApiResponse(200, queue, "Song removed from queue."));
});

export const clearQueue = asyncHandler(async (req, res) => {
  const queue = await queueService.clearQueue(req.user._id);
  res.status(200).json(new ApiResponse(200, queue, "Queue cleared successfully."));
});

export const playNext = asyncHandler(async (req, res) => {
  const result = await queueService.advanceQueue({ userId: req.user._id, direction: "next" });
  res.status(200).json(new ApiResponse(200, result, "Advanced to next track."));
});

export const playPrevious = asyncHandler(async (req, res) => {
  const result = await queueService.advanceQueue({ userId: req.user._id, direction: "previous" });
  res.status(200).json(new ApiResponse(200, result, "Moved to previous track."));
});

export const setRepeatMode = asyncHandler(async (req, res) => {
  const queue = await queueService.setRepeatMode({
    userId: req.user._id,
    repeatMode: req.body.repeatMode,
  });
  res.status(200).json(new ApiResponse(200, queue, "Repeat mode updated."));
});

export const toggleShuffle = asyncHandler(async (req, res) => {
  const queue = await queueService.toggleShuffle(req.user._id);
  res.status(200).json(new ApiResponse(200, queue, "Shuffle toggled."));
});
