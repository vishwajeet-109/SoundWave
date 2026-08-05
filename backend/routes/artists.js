import express from "express";

import {
  getArtist,
  getArtists,
} from "../controllers/artistController.js";

import {
  artistFollowRouter,
  artistFollowersRouter,
  myFollowingRouter,
} from "./followRoutes.js";

const router = express.Router();

router.get("/", getArtists);

router.get("/:id", getArtist);

// Follow / Unfollow
router.use("/:artistId/follow", artistFollowRouter);

// Followers
router.use("/:artistId/followers", artistFollowersRouter);

export default router;

export { myFollowingRouter };