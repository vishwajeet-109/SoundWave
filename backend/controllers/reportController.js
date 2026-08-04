// controllers/reportController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import reportService from "../services/reportService.js";

export const createReport = asyncHandler(async (req, res) => {
  const report = await reportService.createReport({
    reporterId: req.user._id,
    songId: req.body.songId,
    artistId: req.body.artistId,
    reason: req.body.reason,
    description: req.body.description,
  });
  res.status(201).json(new ApiResponse(201, "Report submitted successfully.", report));
});

export const listReports = asyncHandler(async (req, res) => {
  const result = await reportService.listReports({ status: req.query.status, query: req.query });
  res.status(200).json(new ApiResponse(200, "Reports fetched successfully.", result));
});

export const reviewReport = asyncHandler(async (req, res) => {
  const report = await reportService.reviewReport({
    reportId: req.params.reportId,
    adminId: req.user._id,
    status: req.body.status,
    note: req.body.note,
    req,
  });
  res.status(200).json(new ApiResponse(200, "Report reviewed successfully.", report));
});
