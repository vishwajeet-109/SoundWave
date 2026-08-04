// controllers/likeController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import likeService from "../services/likeService.js";

export const likeSong = asyncHandler(async (req, res) => {
  const result = await likeService.likeSong({ userId: req.user._id, songId: req.params.songId });
  res.status(201).json(new ApiResponse(201, result, "Song liked successfully."));
});

export const unlikeSong = asyncHandler(async (req, res) => {
  const result = await likeService.unlikeSong({ userId: req.user._id, songId: req.params.songId });
  res.status(200).json(new ApiResponse(200, result, "Song unliked successfully."));
});

export const listLikedSongs = asyncHandler(async (req, res) => {
  const result = await likeService.listLikedSongs({ userId: req.user._id, query: req.query });
  res.status(200).json(new ApiResponse(200, result, "Liked songs fetched successfully."));
});
