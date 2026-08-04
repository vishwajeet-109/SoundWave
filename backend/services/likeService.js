// services/likeService.js

import Like from "../models/Like.js";
import Song from "../models/Song.js";
import ApiError from "../utils/ApiError.js";
import { getPaginationParams, buildPaginatedResult } from "../utils/pagination.js";

/**
 * Likes a song. Uses the unique compound index (user+song) as the
 * source of truth for duplicate prevention rather than a pre-check,
 * to avoid a race condition between check and insert.
 */
const likeSong = async ({ userId, songId }) => {
  const song = await Song.findById(songId);
  if (!song) throw new ApiError(404, "Song not found.");

  try {
    await Like.create({ user: userId, song: songId });
  } catch (error) {
    if (error.code === 11000) {
      throw new ApiError(409, "You already liked this song.");
    }
    throw error;
  }

  await Song.updateOne({ _id: songId }, { $inc: { likeCount: 1 } });
  return { songId, liked: true };
};

const unlikeSong = async ({ userId, songId }) => {
  const result = await Like.findOneAndDelete({ user: userId, song: songId });
  if (!result) throw new ApiError(404, "You have not liked this song.");

  await Song.updateOne({ _id: songId }, { $inc: { likeCount: -1 } });
  return { songId, liked: false };
};

const listLikedSongs = async ({ userId, query }) => {
  const { page, limit, skip } = getPaginationParams(query);

  const [likes, total] = await Promise.all([
    Like.find({ user: userId })
      .populate({
        path: "song",
        select: "title slug coverImage audioUrl duration artist status",
        populate: { path: "artist", select: "name avatar" },
      })
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    Like.countDocuments({ user: userId }),
  ]);

  const items = likes.map((like) => like.song).filter(Boolean);
  return buildPaginatedResult({ items, total, page, limit });
};

export default { likeSong, unlikeSong, listLikedSongs };
