// routes/playlistRoutes.js
//
// Mount example:
//   import playlistRoutes from "./playlistRoutes.js";
//   router.use("/playlists", playlistRoutes);
// Final path example: /api/v1/playlists

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

router.use(authMiddleware);

router.get("/", listPlaylistsValidator, validateRequest, listPlaylists);
router.get("/:playlistId", playlistIdParamValidator, validateRequest, getPlaylistById);

router.post("/", createPlaylistValidator, validateRequest, createPlaylist);
router.patch("/:playlistId", updatePlaylistValidator, validateRequest, updatePlaylist);
router.delete("/:playlistId", playlistIdParamValidator, validateRequest, deletePlaylist);

router.post(
  "/:playlistId/songs",
  playlistSongMutationValidator,
  validateRequest,
  addSongToPlaylist
);
router.delete(
  "/:playlistId/songs",
  playlistSongMutationValidator,
  validateRequest,
  removeSongFromPlaylist
);

router.post("/:playlistId/follow", playlistIdParamValidator, validateRequest, followPlaylist);
router.delete("/:playlistId/follow", playlistIdParamValidator, validateRequest, unfollowPlaylist);

export default router;
