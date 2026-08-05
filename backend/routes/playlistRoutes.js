import { Router } from "express";

import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";

import {
  createPlaylistValidator,
  updatePlaylistValidator,
  playlistIdParamValidator,
  playlistSongMutationValidator,
  listPlaylistsValidator,
} from "../validators/playlistValidator.js";

import {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getPlaylistById,
  listPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  followPlaylist,
  unfollowPlaylist,
} from "../controllers/playlistController.js";

const router = Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

router.get(
  "/",
  listPlaylistsValidator,
  validateRequest,
  listPlaylists
);

router.get(
  "/:playlistId",
  authMiddleware,
  playlistIdParamValidator,
  validateRequest,
  getPlaylistById
);
/*
|--------------------------------------------------------------------------
| Protected Routes
|--------------------------------------------------------------------------
*/

router.post(
  "/",
  authMiddleware,
  createPlaylistValidator,
  validateRequest,
  createPlaylist
);

router.patch(
  "/:playlistId",
  authMiddleware,
  updatePlaylistValidator,
  validateRequest,
  updatePlaylist
);

router.delete(
  "/:playlistId",
  authMiddleware,
  playlistIdParamValidator,
  validateRequest,
  deletePlaylist
);

router.post(
  "/:playlistId/songs",
  authMiddleware,
  playlistSongMutationValidator,
  validateRequest,
  addSongToPlaylist
);

router.delete(
  "/:playlistId/songs",
  authMiddleware,
  playlistSongMutationValidator,
  validateRequest,
  removeSongFromPlaylist
);

router.post(
  "/:playlistId/follow",
  authMiddleware,
  playlistIdParamValidator,
  validateRequest,
  followPlaylist
);

router.delete(
  "/:playlistId/follow",
  authMiddleware,
  playlistIdParamValidator,
  validateRequest,
  unfollowPlaylist
);

export default router;