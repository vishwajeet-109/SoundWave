// controllers/historyController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import listeningHistoryService from "../services/listeningHistoryService.js";

export const getMyHistory = asyncHandler(async (req, res) => {
  const result = await listeningHistoryService.listHistory({
    userId: req.user._id,
    query: req.query,
  });
  res.status(200).json(new ApiResponse(200, result, "Listening history fetched successfully."));
});

export const clearMyHistory = asyncHandler(async (req, res) => {
  const result = await listeningHistoryService.clearHistory(req.user._id);
  res.status(200).json(new ApiResponse(200, result, "Listening history cleared successfully."));
});
