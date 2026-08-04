// controllers/recommendationController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import recommendationService from "../services/recommendationService.js";

export const getRecommendations = asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);
  const result = await recommendationService.getRecommendationsForUser({
    userId: req.user._id,
    limit,
  });
  res.status(200).json(new ApiResponse(200, result, "Recommendations fetched successfully."));
});

export const getTrending = asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 20, 50);
  const items = await recommendationService.getTrendingSongs(limit);
  res.status(200).json(new ApiResponse(200, { items }, "Trending songs fetched successfully."));
});
