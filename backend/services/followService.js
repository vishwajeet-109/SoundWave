// services/followService.js

import Follow from "../models/Follow.js";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { ROLES } from "../constants/roles.js";
import { getPaginationParams, buildPaginatedResult } from "../utils/pagination.js";

const assertArtistExists = async (artistId) => {
  const artist = await User.findOne({ _id: artistId, role: ROLES.ARTIST });
  if (!artist) throw new ApiError(404, "Artist not found.");
  return artist;
};

const followArtist = async ({ userId, artistId }) => {
  if (userId.toString() === artistId.toString()) {
    throw new ApiError(400, "You cannot follow yourself.");
  }
  await assertArtistExists(artistId);

  try {
    await Follow.create({ user: userId, artist: artistId });
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "You already follow this artist.");
    }
    throw error;
  }

  return { artistId, following: true };
};

const unfollowArtist = async ({ userId, artistId }) => {
  const result = await Follow.findOneAndDelete({ user: userId, artist: artistId });
  if (!result) throw new ApiError(404, "You do not follow this artist.");
  return { artistId, following: false };
};

const listFollowedArtists = async ({ userId, query }) => {
  const { page, limit, skip } = getPaginationParams(query);

  const [follows, total] = await Promise.all([
    Follow.find({ user: userId })
      .populate("artist", "name avatar bio")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Follow.countDocuments({ user: userId }),
  ]);

  const items = follows.map((f) => f.artist).filter(Boolean);
  return buildPaginatedResult({ items, total, page, limit });
};

const listArtistFollowers = async ({ artistId, query }) => {
  const { page, limit, skip } = getPaginationParams(query);

  const [follows, total] = await Promise.all([
    Follow.find({ artist: artistId })
      .populate("user", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Follow.countDocuments({ artist: artistId }),
  ]);

  const items = follows.map((f) => f.user).filter(Boolean);
  return buildPaginatedResult({ items, total, page, limit });
};

export default { followArtist, unfollowArtist, listFollowedArtists, listArtistFollowers };
