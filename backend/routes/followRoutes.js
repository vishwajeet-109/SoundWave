// routes/followRoutes.js
// Mount at /api/v1/artists/:artistId/follow (follow/unfollow/followers)
// and /api/v1/me/following (current user's followed artists)

import { Router } from "express";
import authMiddleware from "../middleware/authMiddleware.js";
import validateRequest from "../middleware/validateRequest.js";
import {
  artistIdParamValidator,
  paginationQueryValidator,
} from "../validators/engagementValidator.js";
import {
  followArtist,
  unfollowArtist,
  listFollowedArtists,
  listArtistFollowers,
} from "../controllers/followController.js";

const artistFollowRouter = Router({ mergeParams: true });
artistFollowRouter.use(authMiddleware);
artistFollowRouter.post("/", artistIdParamValidator, validateRequest, followArtist);
artistFollowRouter.delete("/", artistIdParamValidator, validateRequest, unfollowArtist);

const artistFollowersRouter = Router({ mergeParams: true });
artistFollowersRouter.get(
  "/",
  authMiddleware,
  artistIdParamValidator,
  paginationQueryValidator,
  validateRequest,
  listArtistFollowers
);

const myFollowingRouter = Router();
myFollowingRouter.get("/", authMiddleware, paginationQueryValidator, validateRequest, listFollowedArtists);

export { artistFollowRouter, artistFollowersRouter, myFollowingRouter };
