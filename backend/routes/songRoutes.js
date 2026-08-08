import express from "express";
import songController from "../controllers/songController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import upload from "../middleware/uploadMiddleware.js";
import {
  createSongValidator,
  updateSongValidator,
} from "../validators/songValidator.js";
import { ROLES } from "../constants/roles.js";

const router = express.Router();

/*
|--------------------------------------------------------------------------
| Public Routes
|--------------------------------------------------------------------------
*/

// Get all approved songs
router.get("/", songController.getAllSongs);

// Artist/Admin specific routes MUST come before "/:id"

// Get logged-in artist songs
router.get(
  "/my-songs",
  authMiddleware,
  roleMiddleware(ROLES.ARTIST),
  songController.getMySongs
);

// Get pending songs (Admin)
router.get(
  "/pending/list",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  songController.getPendingSongs
);

// Get single song
router.get("/:id", songController.getSongById);

/*
|--------------------------------------------------------------------------
| Artist Routes
|--------------------------------------------------------------------------
*/

// Create song
router.post(
  "/",
  authMiddleware,
  roleMiddleware(ROLES.ARTIST),
  upload.fields([
    {
      name: "coverImage",
      maxCount: 1,
    },
    {
      name: "audioFile",
      maxCount: 1,
    },
  ]),
  createSongValidator,
  validateRequest,
  songController.createSong
);

// Update song
router.put(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ARTIST),
  updateSongValidator,
  validateRequest,
  songController.updateSong
);

// Delete song
router.delete(
  "/:id",
  authMiddleware,
  roleMiddleware(ROLES.ARTIST),
  songController.deleteSong
);

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
*/

// Approve song
router.patch(
  "/:id/approve",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  songController.approveSong
);

// Reject song
router.patch(
  "/:id/reject",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  songController.rejectSong
);

// Block song
router.patch(
  "/:id/block",
  authMiddleware,
  roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN),
  songController.blockSong
);

export default router;