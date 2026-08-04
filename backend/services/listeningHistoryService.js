// services/listeningHistoryService.js

import ListeningHistory from "../models/ListeningHistory.js";
import { getPaginationParams, buildPaginatedResult } from "../utils/pagination.js";

const listHistory = async ({ userId, query }) => {
  const { page, limit, skip } = getPaginationParams(query);

  const [items, total] = await Promise.all([
    ListeningHistory.find({ user: userId })
      .populate({
        path: "song",
        select: "title slug coverImage audioUrl duration artist",
        populate: { path: "artist", select: "name avatar" },
      })
      .sort({ playedAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),
    ListeningHistory.countDocuments({ user: userId }),
  ]);

  return buildPaginatedResult({ items, total, page, limit });
};

const clearHistory = async (userId) => {
  await ListeningHistory.deleteMany({ user: userId });
  return { cleared: true };
};

export default { listHistory, clearHistory };
