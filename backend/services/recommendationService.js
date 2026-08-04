// services/recommendationService.js
//
// Simple, explainable recommendation strategy for this sprint:
//   1. Derive the user's top genres from their listening history + likes.
//   2. Recommend approved/public songs in those genres they haven't
//      already played, ranked by playCount.
//   3. If the user has no history yet (cold start), fall back to
//      global trending songs.
// A proper collaborative-filtering model is flagged as future work —
// see Sprint delivery notes.

import mongoose from "mongoose";
import Song from "../models/Song.js";
import ListeningHistory from "../models/ListeningHistory.js";
import Like from "../models/Like.js";
import { SONG_STATUS, SONG_VISIBILITY } from "../constants/songStatus.js";

const getTrendingSongs = async (limit, excludeIds = []) =>
  Song.find({
    status: SONG_STATUS.APPROVED,
    visibility: SONG_VISIBILITY.PUBLIC,
    _id: { $nin: excludeIds },
  })
    .populate("artist", "name avatar")
    .sort({ playCount: -1 })
    .limit(limit)
    .lean();

const getTopGenresForUser = async (userId) => {
  const objectId = new mongoose.Types.ObjectId(userId);

  const genreCounts = await ListeningHistory.aggregate([
    { $match: { user: objectId } },
    { $lookup: { from: "songs", localField: "song", foreignField: "_id", as: "song" } },
    { $unwind: "$song" },
    { $match: { "song.genre": { $ne: null } } },
    { $group: { _id: "$song.genre", count: { $sum: 1 } } },
    { $sort: { count: -1 } },
    { $limit: 5 },
  ]);

  return genreCounts.map((g) => g._id);
};

const getRecommendationsForUser = async ({ userId, limit = 20 }) => {
  const [playedSongIds, likedSongIds, topGenres] = await Promise.all([
    ListeningHistory.find({ user: userId }).distinct("song"),
    Like.find({ user: userId }).distinct("song"),
    getTopGenresForUser(userId),
  ]);

  const excludeIds = [
    ...new Set([...playedSongIds, ...likedSongIds].map((id) => id.toString())),
  ];

  if (topGenres.length === 0) {
    const trending = await getTrendingSongs(limit, excludeIds);
    return { strategy: "trending", items: trending };
  }

  const genreBased = await Song.find({
    status: SONG_STATUS.APPROVED,
    visibility: SONG_VISIBILITY.PUBLIC,
    genre: { $in: topGenres },
    _id: { $nin: excludeIds },
  })
    .populate("artist", "name avatar")
    .sort({ playCount: -1 })
    .limit(limit)
    .lean();

  if (genreBased.length < limit) {
    const usedIds = [...excludeIds, ...genreBased.map((s) => s._id.toString())];
    const filler = await getTrendingSongs(limit - genreBased.length, usedIds);
    return {
      strategy: "genre_affinity_with_trending_fallback",
      items: [...genreBased, ...filler],
    };
  }

  return { strategy: "genre_affinity", items: genreBased };
};

export default { getRecommendationsForUser, getTrendingSongs };
