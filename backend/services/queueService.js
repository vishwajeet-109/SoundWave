// services/queueService.js

import Queue from "../models/Queue.js";
import Song from "../models/Song.js";
import ApiError from "../utils/ApiError.js";
import { SONG_STATUS } from "../constants/songStatus.js";

let getIO = null;
try {
  ({ getIO } = await import("../socket/index.js"));
} catch (error) {
  getIO = null;
}

/**
 * Pushes the updated queue to the user's other connected devices so
 * a change made on one client (add/remove/reorder) reflects live
 * everywhere else, not just on next page load.
 */
const broadcastQueueUpdate = (userId, queue) => {
  try {
    const io = typeof getIO === "function" ? getIO() : null;
    if (io) {
      io.to(`user:${userId.toString()}`).emit("queue:update", queue);
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to broadcast queue update:", error.message);
  }
};

const SONG_FIELDS = "title slug coverImage audioUrl duration artist status";

const getOrCreateQueue = async (userId) => {
  let queue = await Queue.findOne({ user: userId });
  if (!queue) {
    queue = await Queue.create({ user: userId, songs: [], currentIndex: 0 });
  }
  return queue;
};

const getQueue = async (userId) => {
  const queue = await getOrCreateQueue(userId);
  return queue.populate("songs", SONG_FIELDS);
};

/**
 * Replaces the entire queue (e.g. "play this album/playlist now").
 * Only APPROVED songs are accepted into the queue.
 */
const setQueue = async ({ userId, songIds, startIndex = 0 }) => {
  const validSongs = await Song.find({
    _id: { $in: songIds },
    status: SONG_STATUS.APPROVED,
  }).select("_id");

  if (validSongs.length === 0) {
    throw new ApiError(400, "None of the provided songs are available to queue.");
  }

  const validIds = new Set(validSongs.map((s) => s._id.toString()));
  const orderedIds = songIds.filter((id) => validIds.has(id));

  const queue = await getOrCreateQueue(userId);
  queue.songs = orderedIds;
  queue.currentIndex = Math.min(startIndex, orderedIds.length - 1);
  await queue.save();

  const populated = await queue.populate("songs", SONG_FIELDS);
  broadcastQueueUpdate(userId, populated);
  return populated;
};

const addToQueue = async ({ userId, songId, position = "end" }) => {
  const song = await Song.findOne({ _id: songId, status: SONG_STATUS.APPROVED });
  if (!song) throw new ApiError(404, "Song not found or not available.");

  const queue = await getOrCreateQueue(userId);

  if (position === "next") {
    queue.songs.splice(queue.currentIndex + 1, 0, songId);
  } else {
    queue.songs.push(songId);
  }
  await queue.save();

  const populated = await queue.populate("songs", SONG_FIELDS);
  broadcastQueueUpdate(userId, populated);
  return populated;
};

const removeFromQueue = async ({ userId, index }) => {
  const queue = await getOrCreateQueue(userId);

  if (index < 0 || index >= queue.songs.length) {
    throw new ApiError(400, "Queue index out of range.");
  }

  queue.songs.splice(index, 1);
  if (queue.currentIndex >= queue.songs.length) {
    queue.currentIndex = Math.max(0, queue.songs.length - 1);
  }
  await queue.save();

  const populated = await queue.populate("songs", SONG_FIELDS);
  broadcastQueueUpdate(userId, populated);
  return populated;
};

const clearQueue = async (userId) => {
  const queue = await getOrCreateQueue(userId);
  queue.songs = [];
  queue.currentIndex = 0;
  await queue.save();
  broadcastQueueUpdate(userId, queue);
  return queue;
};

/**
 * Advances/rewinds currentIndex, honoring repeatMode:
 *   ONE  -> stays on the same index
 *   ALL  -> wraps around at the end/start
 *   OFF  -> stops at the boundary (returns ended: true)
 */
const advanceQueue = async ({ userId, direction = "next" }) => {
  const queue = await getOrCreateQueue(userId);
  if (queue.songs.length === 0) throw new ApiError(400, "Queue is empty.");

  if (queue.repeatMode === "ONE") {
    // no-op on index, caller replays current song
  } else if (direction === "next") {
    if (queue.currentIndex + 1 < queue.songs.length) {
      queue.currentIndex += 1;
    } else if (queue.repeatMode === "ALL") {
      queue.currentIndex = 0;
    } else {
      await queue.save();
      const populated = await queue.populate("songs", SONG_FIELDS);
      return { queue: populated, ended: true };
    }
  } else {
    if (queue.currentIndex - 1 >= 0) {
      queue.currentIndex -= 1;
    } else if (queue.repeatMode === "ALL") {
      queue.currentIndex = queue.songs.length - 1;
    }
  }

  await queue.save();
  const populated = await queue.populate("songs", SONG_FIELDS);
  broadcastQueueUpdate(userId, populated);
  return { queue: populated, ended: false };
};

const setRepeatMode = async ({ userId, repeatMode }) => {
  const queue = await getOrCreateQueue(userId);
  queue.repeatMode = repeatMode;
  await queue.save();
  broadcastQueueUpdate(userId, queue);
  return queue;
};

const toggleShuffle = async (userId) => {
  const queue = await getOrCreateQueue(userId);
  queue.isShuffled = !queue.isShuffled;

  if (queue.isShuffled && queue.songs.length > 1) {
    const current = queue.songs[queue.currentIndex];
    const rest = queue.songs.filter((_, i) => i !== queue.currentIndex);
    for (let i = rest.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [rest[i], rest[j]] = [rest[j], rest[i]];
    }
    queue.songs = [current, ...rest];
    queue.currentIndex = 0;
  }

  await queue.save();
  const populated = await queue.populate("songs", SONG_FIELDS);
  broadcastQueueUpdate(userId, populated);
  return populated;
};

export default {
  getQueue,
  setQueue,
  addToQueue,
  removeFromQueue,
  clearQueue,
  advanceQueue,
  setRepeatMode,
  toggleShuffle,
};
