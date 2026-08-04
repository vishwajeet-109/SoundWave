// services/streamingService.js
//
// Implements the STREAMING FLOW from ARCHITECTURE.md:
//   Permission Check -> Song Lookup -> Cloudinary URL ->
//   HTTP Range Support -> Resume Playback -> Analytics Update

import Song from "../models/Song.js";
import ListeningHistory from "../models/ListeningHistory.js";
import ApiError from "../utils/ApiError.js";
import { SONG_STATUS, SONG_VISIBILITY } from "../constants/songStatus.js";

/**
 * Verifies the requesting user is allowed to stream this song.
 * PUBLIC + APPROVED is streamable by anyone authenticated.
 * PRIVATE/UNLISTED is only streamable by the owning artist (or
 * admins), consistent with "never trust frontend" — status/
 * visibility are always re-checked server-side per request.
 */
const assertStreamable = (song, user) => {
  if (song.status !== SONG_STATUS.APPROVED) {
    const isOwner = song.artist.toString() === user._id.toString();
    const isPrivileged = ["ADMIN", "SUPER_ADMIN"].includes(user.role);
    if (!isOwner && !isPrivileged) {
      throw new ApiError(403, "This song is not available for streaming.");
    }
    return;
  }

  if (song.visibility !== SONG_VISIBILITY.PUBLIC) {
    const isOwner = song.artist.toString() === user._id.toString();
    const isPrivileged = ["ADMIN", "SUPER_ADMIN"].includes(user.role);
    if (!isOwner && !isPrivileged) {
      throw new ApiError(403, "This song is not available for streaming.");
    }
  }
};

/**
 * Fetches the song, checks permission, and returns everything the
 * controller needs to proxy the byte range from Cloudinary.
 */
const getStreamableSong = async ({ songId, user }) => {
  const song = await Song.findById(songId);
  if (!song) throw new ApiError(404, "Song not found.");

  assertStreamable(song, user);

  return song;
};

/**
 * Records a play: increments the song's playCount (fire-and-forget
 * style, doesn't block the stream response) and logs a
 * ListeningHistory entry for recommendations/analytics.
 */
const recordPlay = async ({ songId, userId, device }) => {
  try {
    await Promise.all([
      Song.updateOne({ _id: songId }, { $inc: { playCount: 1 } }),
      ListeningHistory.create({ user: userId, song: songId, device: device || null }),
    ]);
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error("Failed to record play analytics:", error.message);
  }
};

export default { getStreamableSong, recordPlay };
