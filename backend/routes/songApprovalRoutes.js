// routes/admin/songApprovalRoutes.js
//
// Mount this in your main admin router, e.g.:
//   import songApprovalRoutes from "./admin/songApprovalRoutes.js";
//   router.use("/admin/songs", songApprovalRoutes);
// Final path example: /api/v1/admin/songs/pending

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import roleMiddleware from "../middleware/roleMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import { ROLES } from "../constants/roles.js";
import {
  listSongsByStatusValidator,
  approveSongValidator,
  rejectSongValidator,
  blockSongValidator,
  unblockSongValidator,
} from "../validators/songApprovalValidator.js";
import {
  getPendingSongs,
  getApprovedSongs,
  getRejectedSongs,
  getBlockedSongs,
  approveSong,
  rejectSong,
  blockSong,
  unblockSong,
  getApprovalStats,
} from "../controllers/adminSongController.js";

const router = Router();

// Every route below is admin/super-admin only.
router.use(authMiddleware, roleMiddleware(ROLES.ADMIN, ROLES.SUPER_ADMIN));

router.get("/pending", listSongsByStatusValidator, validateRequest, getPendingSongs);
router.get("/approved", listSongsByStatusValidator, validateRequest, getApprovedSongs);
router.get("/rejected", listSongsByStatusValidator, validateRequest, getRejectedSongs);
router.get("/blocked", listSongsByStatusValidator, validateRequest, getBlockedSongs);
router.get("/stats", getApprovalStats);

router.patch("/:songId/approve", approveSongValidator, validateRequest, approveSong);
router.patch("/:songId/reject", rejectSongValidator, validateRequest, rejectSong);
router.patch("/:songId/block", blockSongValidator, validateRequest, blockSong);
router.patch("/:songId/unblock", unblockSongValidator, validateRequest, unblockSong);

export default router;
