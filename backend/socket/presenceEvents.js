// socket/presenceEvents.js

import Follow from "../models/Follow.js";

/**
 * Broadcasts online/offline status to the user's followers only —
 * not globally — so this stays cheap at scale and privacy-respecting.
 */
const notifyFollowers = async (io, userId, isOnline) => {
  try {
    const followers = await Follow.find({ artist: userId }).distinct("user");
    followers.forEach((followerId) => {
      io.to(`user:${followerId.toString()}`).emit("presence:update", {
        userId,
        isOnline,
      });
    });
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to broadcast presence update:", error.message);
  }
};

export const registerPresenceEvents = (io, socket) => {
  notifyFollowers(io, socket.user._id, true);
};

export const markUserOffline = (io, socket) => {
  notifyFollowers(io, socket.user._id, false);
};
