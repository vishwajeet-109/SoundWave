// controllers/albumController.js

import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import albumService from "../services/albumService.js";

export const createAlbum = asyncHandler(async (req, res) => {
  const album = await albumService.createAlbum({ artistId: req.user._id, body: req.body });
  res.status(201).json(new ApiResponse(201, "Album created successfully.", album));
});

export const updateAlbum = asyncHandler(async (req, res) => {
  const album = await albumService.updateAlbum({
    albumId: req.params.albumId,
    user: req.user,
    body: req.body,
  });
  res.status(200).json(new ApiResponse(200, "Album updated successfully.", album));
});

export const deleteAlbum = asyncHandler(async (req, res) => {
  const result = await albumService.deleteAlbum({ albumId: req.params.albumId, user: req.user });
  res.status(200).json(new ApiResponse(200, "Album deleted successfully.", result));
});

export const getAlbumById = asyncHandler(async (req, res) => {
  const album = await albumService.getAlbumById(req.params.albumId);
  res.status(200).json(new ApiResponse(200, "Album fetched successfully.", album));
});

export const listAlbums = asyncHandler(async (req, res) => {
  const result = await albumService.listAlbums({
    query: req.query,
    artist: req.query.artist,
    genre: req.query.genre,
  });
  res.status(200).json(new ApiResponse(200, "Albums fetched successfully.", result));
});

export const addSongToAlbum = asyncHandler(async (req, res) => {
  const album = await albumService.addSongToAlbum({
    albumId: req.params.albumId,
    songId: req.body.songId,
    user: req.user,
  });
  res.status(200).json(new ApiResponse(200, "Song added to album.", album));
});

export const removeSongFromAlbum = asyncHandler(async (req, res) => {
  const album = await albumService.removeSongFromAlbum({
    albumId: req.params.albumId,
    songId: req.body.songId,
    user: req.user,
  });
  res.status(200).json(new ApiResponse(200, "Song removed from album.", album));
});
