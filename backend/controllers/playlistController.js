// controllers/playlistController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import playlistService from "../services/playlistService.js";

export const createPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.createPlaylist({ ownerId: req.user._id, body: req.body });
  res.status(201).json(new ApiResponse(201, "Playlist created successfully.", playlist));
});

export const updatePlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.updatePlaylist({
    playlistId: req.params.playlistId,
    user: req.user,
    body: req.body,
  });
  res.status(200).json(new ApiResponse(200, "Playlist updated successfully.", playlist));
});

export const deletePlaylist = asyncHandler(async (req, res) => {
  const result = await playlistService.deletePlaylist({
    playlistId: req.params.playlistId,
    user: req.user,
  });
  res.status(200).json(new ApiResponse(200, "Playlist deleted successfully.", result));
});

export const getPlaylistById = asyncHandler(async (req, res) => {
  const playlist = await playlistService.getPlaylistById({
    playlistId: req.params.playlistId,
    user: req.user,
  });
  res.status(200).json(new ApiResponse(200, "Playlist fetched successfully.", playlist));
});

export const listPlaylists = asyncHandler(async (req, res) => {
  const result = await playlistService.listPlaylists({ user: req.user, query: req.query });
  res.status(200).json(new ApiResponse(200, "Playlists fetched successfully.", result));
});

export const addSongToPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.addSongToPlaylist({
    playlistId: req.params.playlistId,
    songId: req.body.songId,
    user: req.user,
  });
  res.status(200).json(new ApiResponse(200, "Song added to playlist.", playlist));
});

export const removeSongFromPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.removeSongFromPlaylist({
    playlistId: req.params.playlistId,
    songId: req.body.songId,
    user: req.user,
  });
  res.status(200).json(new ApiResponse(200, "Song removed from playlist.", playlist));
});

export const followPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.followPlaylist({
    playlistId: req.params.playlistId,
    user: req.user,
  });
  res.status(200).json(new ApiResponse(200, "Playlist followed successfully.", playlist));
});

export const unfollowPlaylist = asyncHandler(async (req, res) => {
  const playlist = await playlistService.unfollowPlaylist({
    playlistId: req.params.playlistId,
    user: req.user,
  });
  res.status(200).json(new ApiResponse(200, "Playlist unfollowed successfully.", playlist));
});
