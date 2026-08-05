// services/analyticsService.js
//
// Per DATABASE.md: "Use Aggregation for Trending Songs, Top Artists,
// Monthly Analytics, Dashboard... Never perform expensive loops in
// Node.js." Every function here is a single aggregation pipeline.

import Song from "../models/Song.js";
import User from "../models/User.js";
import ListeningHistory from "../models/ListeningHistory.js";
import Report from "../models/Report.js";
import { SONG_STATUS } from "../constants/songStatus.js";
import { ROLES } from "../constants/roles.js";
import { REPORT_STATUS } from "../constants/reportStatus.js";

/**
 * High-level counts for the admin dashboard landing screen.
 */
const getDashboardOverview = async () => {
  const [songStatusCounts, totalUsers, totalArtists, totalPlays, pendingReports] =
    await Promise.all([
      Song.aggregate([{ $group: { _id: "$status", count: { $sum: 1 } } }]),
      User.countDocuments({}),
      User.countDocuments({ role: ROLES.ARTIST }),
      ListeningHistory.countDocuments({}),
      Report.countDocuments({ status: REPORT_STATUS.PENDING }),
    ]);

  const songsByStatus = Object.values(SONG_STATUS).reduce((acc, status) => {
    acc[status] = 0;
    return acc;
  }, {});
  songStatusCounts.forEach(({ _id, count }) => {
    if (_id in songsByStatus) songsByStatus[_id] = count;
  });

  return {
    totalUsers,
    totalArtists,
    totalPlays,
    pendingReports,
    songsByStatus,
    totalSongs: Object.values(songsByStatus).reduce((sum, n) => sum + n, 0),
  };
};

/**
 * Top artists ranked by combined playCount across their approved
 * songs — a single aggregation instead of N per-artist queries.
 */
const getTopArtists = async ({ limit = 10 } = {}) => {

  let safeLimit = Number(limit);

  if (!Number.isFinite(safeLimit) || safeLimit <= 0) {
    safeLimit = 10;
  }

  safeLimit = Math.min(Math.floor(safeLimit), 50);

  return Song.aggregate([
    { $match: { status: SONG_STATUS.APPROVED } },

    {
      $group: {
        _id: "$artist",
        totalPlays: { $sum: "$playCount" },
        totalLikes: { $sum: "$likeCount" },
        songCount: { $sum: 1 },
      },
    },

    { $sort: { totalPlays: -1 } },

    { $limit: safeLimit },

    {
      $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id",
        as: "artist",
      },
    },

    { $unwind: "$artist" },

    {
      $project: {
        _id: 0,
        artistId: "$_id",
        name: "$artist.name",
        avatar: "$artist.avatar",
        totalPlays: 1,
        totalLikes: 1,
        songCount: 1,
      },
    },
  ]);
};

/**
 * Plays-per-month for the last N months, from ListeningHistory —
 * feeds the admin dashboard's monthly trend chart.
 */
const getMonthlyPlayAnalytics = async ({ months = 6 } = {}) => {
  const since = new Date();
  since.setMonth(since.getMonth() - (months - 1));
  since.setDate(1);
  since.setHours(0, 0, 0, 0);

  return ListeningHistory.aggregate([
    { $match: { playedAt: { $gte: since } } },
    {
      $group: {
        _id: { year: { $year: "$playedAt" }, month: { $month: "$playedAt" } },
        totalPlays: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        totalPlays: 1,
      },
    },
  ]);
};

/**
 * Songs-uploaded-per-month for the last N months, from Song.createdAt.
 */
const getMonthlyUploadAnalytics = async ({ months = 6 } = {}) => {
  const since = new Date();
  since.setMonth(since.getMonth() - (months - 1));
  since.setDate(1);
  since.setHours(0, 0, 0, 0);

  return Song.aggregate([
    { $match: { createdAt: { $gte: since } } },
    {
      $group: {
        _id: { year: { $year: "$createdAt" }, month: { $month: "$createdAt" } },
        totalUploads: { $sum: 1 },
      },
    },
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    {
      $project: {
        _id: 0,
        year: "$_id.year",
        month: "$_id.month",
        totalUploads: 1,
      },
    },
  ]);
};

export default {
  getDashboardOverview,
  getTopArtists,
  getMonthlyPlayAnalytics,
  getMonthlyUploadAnalytics,
};
