// controllers/songUploadController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import songUploadService from "../services/songUploadService.js";

export const uploadSong = asyncHandler(async (req, res) => {
  const song = await songUploadService.createSongDraft({
    artistId: req.user._id,
    files: req.files,
    body: req.body,
  });
  res.status(201).json(new ApiResponse(201, "Song uploaded as draft.", song));
});

export const submitSongForReview = asyncHandler(async (req, res) => {
  const song = await songUploadService.submitForReview({
    songId: req.params.songId,
    artistId: req.user._id,
  });
  res.status(200).json(new ApiResponse(200, "Song submitted for review.", song));
});

export const getMySongs = asyncHandler(async (req, res) => {
  const result = await songUploadService.listMySongs({
    artistId: req.user._id,
    status: req.query.status,
    query: req.query,
  });
  res.status(200).json(new ApiResponse(200, "Your songs fetched successfully.", result));
});

export const deleteMySong = asyncHandler(async (req, res) => {
  const result = await songUploadService.deleteOwnedSong({
    songId: req.params.songId,
    artistId: req.user._id,
  });
  res.status(200).json(new ApiResponse(200, "Song deleted successfully.", result));
});
