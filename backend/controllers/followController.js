// controllers/followController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import followService from "../services/followService.js";

export const followArtist = asyncHandler(async (req, res) => {
  const result = await followService.followArtist({
    userId: req.user._id,
    artistId: req.params.artistId,
  });
  res.status(201).json(new ApiResponse(201, result, "Artist followed successfully."));
});

export const unfollowArtist = asyncHandler(async (req, res) => {
  const result = await followService.unfollowArtist({
    userId: req.user._id,
    artistId: req.params.artistId,
  });
  res.status(200).json(new ApiResponse(200, result, "Artist unfollowed successfully."));
});

export const listFollowedArtists = asyncHandler(async (req, res) => {
  const result = await followService.listFollowedArtists({
    userId: req.user._id,
    query: req.query,
  });
  res.status(200).json(new ApiResponse(200, result, "Followed artists fetched successfully."));
});

export const listArtistFollowers = asyncHandler(async (req, res) => {
  const result = await followService.listArtistFollowers({
    artistId: req.params.artistId,
    query: req.query,
  });
  res.status(200).json(new ApiResponse(200, result, "Artist followers fetched successfully."));
});
