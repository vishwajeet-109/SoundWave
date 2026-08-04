// controllers/searchController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import searchService from "../services/searchService.js";

export const search = asyncHandler(async (req, res) => {
  const result = await searchService.unifiedSearch({
    q: req.query.q,
    type: req.query.type,
    query: req.query,
  });
  res.status(200).json(new ApiResponse(200, "Search results fetched successfully.", result));
});
