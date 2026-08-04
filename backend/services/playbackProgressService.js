// services/playbackProgressService.js

import PlaybackProgress from "../models/PlaybackProgress.js";

/**
 * Upserts the user's position in a song. Called periodically by the
 * client (e.g. every ~10s of playback) and once more on pause/unload.
 */
const updateProgress = async ({ userId, songId, positionSeconds, completed = false }) => {
  const progress = await PlaybackProgress.findOneAndUpdate(
    { user: userId, song: songId },
    { positionSeconds, completed },
    { new: true, upsert: true, setDefaultsOnInsert: true }
  );
  return progress;
};

const getProgress = async ({ userId, songId }) => {
  const progress = await PlaybackProgress.findOne({ user: userId, song: songId }).lean();
  return progress || { user: userId, song: songId, positionSeconds: 0, completed: false };
};

/**
 * Recently-played-with-position list — powers a "Continue Listening"
 * shelf, distinct from the full ListeningHistory log.
 */
const listInProgress = async ({ userId, limit = 20 }) => {
  return PlaybackProgress.find({ user: userId, completed: false, positionSeconds: { $gt: 0 } })
    .populate({
      path: "song",
      select: "title slug coverImage audioUrl duration artist",
      populate: { path: "artist", select: "name avatar" },
    })
    .sort({ updatedAt: -1 })
    .limit(limit)
    .lean();
};

export default { updateProgress, getProgress, listInProgress };
