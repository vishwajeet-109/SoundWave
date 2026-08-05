// services/playlistService.js

import Playlist from "../models/Playlist.js";
import Song from "../models/Song.js";
import ApiError from "../utils/ApiError.js";
import generateSlug from "../utils/slugGenerator.js";
import { getPaginationParams, buildPaginatedResult } from "../utils/pagination.js";
import { VISIBILITY } from "../constants/visibility.js";
import { SONG_STATUS } from "../constants/songStatus.js";

const findAccessiblePlaylistOrThrow = async (playlistId, user) => {
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new ApiError(404, "Playlist not found.");

  const isOwner = playlist.owner.toString() === user._id.toString();
  if (playlist.visibility === VISIBILITY.PRIVATE && !isOwner) {
    throw new ApiError(403, "This playlist is private.");
  }
  return playlist;
};

const findEditablePlaylistOrThrow = async (playlistId, user) => {
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new ApiError(404, "Playlist not found.");

  const isOwner = playlist.owner.toString() === user._id.toString();
  const isCollaborator = playlist.isCollaborative; // any authenticated user may add songs
  if (!isOwner && !isCollaborator) {
    throw new ApiError(403, "You do not have permission to modify this playlist.");
  }
  return playlist;
};

const createPlaylist = async ({ ownerId, body }) => {

  const slug = generateSlug(body.title);

  const exists = await Playlist.findOne({
    slug,
  });

  if (exists) {
    throw new ApiError(
      409,
      "Playlist title already exists."
    );
  }

  const playlist = await Playlist.create({

    title: body.title,

    slug,

    owner: ownerId,

    description: body.description,

    visibility:
      body.visibility || VISIBILITY.PRIVATE,

    isCollaborative:
      !!body.isCollaborative,

  });

  return playlist;

};

const updatePlaylist = async ({ playlistId, user, body }) => {

  const playlist = await Playlist.findById(playlistId);

  if (!playlist) {
    throw new ApiError(404, "Playlist not found.");
  }

  if (playlist.owner.toString() !== user._id.toString()) {
    throw new ApiError(
      403,
      "Only the owner can update playlist settings."
    );
  }

  // Prevent duplicate title
  if (body.title) {

    const slug = generateSlug(body.title);

    const exists = await Playlist.findOne({
      slug,
      _id: { $ne: playlistId }
    });

    if (exists) {
      throw new ApiError(
        409,
        "Playlist title already exists."
      );
    }

  }

  const editableFields = [
    "title",
    "description",
    "visibility",
    "isCollaborative"
  ];

  editableFields.forEach((field) => {

    if (body[field] !== undefined) {
      playlist[field] = body[field];
    }

  });

  if (body.title) {
    playlist.slug = generateSlug(body.title);
  }

  await playlist.save();

  return playlist;

};

const deletePlaylist = async ({ playlistId, user }) => {
  const playlist = await Playlist.findById(playlistId);
  if (!playlist) throw new ApiError(404, "Playlist not found.");
  if (playlist.owner.toString() !== user._id.toString()) {
    throw new ApiError(403, "Only the owner can delete this playlist.");
  }
  await playlist.deleteOne();
  return { playlistId };
};

const getPlaylistById = async ({ playlistId, user }) => {
  const playlist = await Playlist.findById(playlistId)
    .populate("owner", "name avatar")
    .populate("songs", "title slug audioUrl coverImage duration status")
    .populate("followers", "name avatar");

  if (!playlist) throw new ApiError(404, "Playlist not found.");

  const isOwner =
  user &&
  playlist.owner._id.toString() === user._id.toString();

if (
  playlist.visibility === VISIBILITY.PRIVATE &&
  !isOwner
) {
  throw new ApiError(
    403,
    "This playlist is private."
  );
}
  return playlist;
};

/**
 * Lists playlists visible to the requesting user: their own (any
 * visibility) plus everyone else's PUBLIC/UNLISTED playlists.
 */
const listPlaylists = async ({ user, query }) => {
  const { page, limit, skip } = getPaginationParams(query);

  const filter = user
    ? {
        $or: [
          { owner: user._id },
          { visibility: { $ne: VISIBILITY.PRIVATE } },
        ],
      }
    : {
        visibility: { $ne: VISIBILITY.PRIVATE },
      };

  const [items, total] = await Promise.all([
    Playlist.find(filter)
      .populate("owner", "name avatar")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean(),

    Playlist.countDocuments(filter),
  ]);

  return buildPaginatedResult({
    items,
    total,
    page,
    limit,
  });
};

/**
 * Adds a song to a playlist. Only APPROVED songs may be added — a
 * playlist shouldn't surface unreleased/rejected tracks to listeners.
 */
const addSongToPlaylist = async ({ playlistId, songId, user }) => {
  const playlist = await findEditablePlaylistOrThrow(playlistId, user);

  const song = await Song.findById(songId);
  if (!song) throw new ApiError(404, "Song not found.");
  if (song.status !== SONG_STATUS.APPROVED) {
    throw new ApiError(409, "Only approved songs can be added to a playlist.");
  }

  if (playlist.songs.some((id) => id.toString() === songId)) {
    throw new ApiError(409, "Song is already in this playlist.");
  }

  playlist.songs.push(songId);

playlist.totalSongs = playlist.songs.length;

playlist.totalDuration += song.duration || 0;

await playlist.save();

return playlist;
};

const removeSongFromPlaylist = async ({
  playlistId,
  songId,
  user,
}) => {

  const playlist = await findEditablePlaylistOrThrow(
    playlistId,
    user
  );

  if (
    !playlist.songs.some(
      (id) => id.toString() === songId
    )
  ) {
    throw new ApiError(
      404,
      "Song not found in playlist."
    );
  }

  const song = await Song.findById(songId);

  playlist.songs = playlist.songs.filter(
    (id) => id.toString() !== songId
  );

  playlist.totalSongs = playlist.songs.length;

  if (song) {
    playlist.totalDuration = Math.max(
      0,
      playlist.totalDuration - (song.duration || 0)
    );
  }

  await playlist.save();

  return playlist;

};

const followPlaylist = async ({ playlistId, user }) => {

  const playlist = await findAccessiblePlaylistOrThrow(
    playlistId,
    user
  );

  if (
    playlist.owner.toString() === user._id.toString()
  ) {
    throw new ApiError(
      400,
      "You cannot follow your own playlist."
    );
  }

  const alreadyFollowing = playlist.followers.some(
    (id) => id.toString() === user._id.toString()
  );

  if (alreadyFollowing) {
    throw new ApiError(
      409,
      "You already follow this playlist."
    );
  }

  playlist.followers.push(user._id);

  await playlist.save();

  return playlist;

};
const unfollowPlaylist = async ({
  playlistId,
  user,
}) => {

  const playlist = await Playlist.findById(
    playlistId
  );

  if (!playlist) {
    throw new ApiError(
      404,
      "Playlist not found."
    );
  }

  const alreadyFollowing = playlist.followers.some(
    (id) => id.toString() === user._id.toString()
  );

  if (!alreadyFollowing) {
    throw new ApiError(
      409,
      "You are not following this playlist."
    );
  }

  playlist.followers = playlist.followers.filter(
    (id) => id.toString() !== user._id.toString()
  );

  await playlist.save();

  return playlist;

};

export default {
  createPlaylist,
  updatePlaylist,
  deletePlaylist,
  getPlaylistById,
  listPlaylists,
  addSongToPlaylist,
  removeSongFromPlaylist,
  followPlaylist,
  unfollowPlaylist,
};
