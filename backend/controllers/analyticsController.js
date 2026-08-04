// controllers/analyticsController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import analyticsService from "../services/analyticsService.js";

export const getDashboardOverview = asyncHandler(async (req, res) => {
  const overview = await analyticsService.getDashboardOverview();
  res.status(200).json(new ApiResponse(200, "Dashboard overview fetched successfully.", overview));
});

export const getTopArtists = asyncHandler(async (req, res) => {
  const limit = Math.min(parseInt(req.query.limit, 10) || 10, 50);
  const items = await analyticsService.getTopArtists({ limit });
  res.status(200).json(new ApiResponse(200, "Top artists fetched successfully.", { items }));
});

export const getMonthlyAnalytics = asyncHandler(async (req, res) => {
  const months = Math.min(parseInt(req.query.months, 10) || 6, 24);
  const [plays, uploads] = await Promise.all([
    analyticsService.getMonthlyPlayAnalytics({ months }),
    analyticsService.getMonthlyUploadAnalytics({ months }),
  ]);
  res
    .status(200)
    .json(new ApiResponse(200, "Monthly analytics fetched successfully.", { plays, uploads }));
});
