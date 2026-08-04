// services/songUploadService.js

import Song from "../models/Song.js";
import ApiError from "../utils/ApiError.js";
import generateSlug from "../utils/slugGenerator.js";
import cloudinaryService from "./cloudinaryService.js";
import { SONG_STATUS, SONG_STATUS_TRANSITIONS } from "../constants/songStatus.js";
import { getPaginationParams, buildPaginatedResult } from "../utils/pagination.js";

const assertTransitionAllowed = (currentStatus, nextStatus) => {
  const allowed = SONG_STATUS_TRANSITIONS[currentStatus] || [];
  if (!allowed.includes(nextStatus)) {
    throw new ApiError(409, `Cannot move song from ${currentStatus} to ${nextStatus}.`);
  }
};

const findOwnedSongOrThrow = async (songId, artistId) => {
  const song = await Song.findById(songId);
  if (!song) throw new ApiError(404, "Song not found.");
  if (song.artist.toString() !== artistId.toString()) {
    throw new ApiError(403, "You do not have permission to modify this song.");
  }
  return song;
};

/**
 * Handles a full song upload: pushes audio (+ optional cover) to
 * Cloudinary, then creates the Song document in DRAFT status.
 * Artist must call submitForReview() separately to move to PENDING —
 * keeping "save as draft" and "submit" as distinct actions.
 */
const createSongDraft = async ({ artistId, files, body }) => {
  const audioFile = files?.audio?.[0];
  if (!audioFile) {
    throw new ApiError(400, "Audio file is required.");
  }

  const audioUpload = await cloudinaryService.uploadAudio(audioFile.buffer);

  let coverImageUrl = null;
  const coverFile = files?.coverImage?.[0];
  if (coverFile) {
    const coverUpload = await cloudinaryService.uploadImage(coverFile.buffer);
    coverImageUrl = coverUpload.url;
  }

  const song = await Song.create({
    title: body.title,
    slug: generateSlug(body.title),
    artist: artistId,
    album: body.album || null,
    genre: body.genre || null,
    category: body.category || null,
    language: body.language,
    description: body.description,
    lyrics: body.lyrics,
    coverImage: coverImageUrl,
    audioUrl: audioUpload.url,
    duration: audioUpload.duration,
    isExplicit: !!body.isExplicit,
    status: SONG_STATUS.DRAFT,
  });

  return song;
};

/**
 * Moves a DRAFT (or REJECTED, for resubmission) song into PENDING
 * so it appears in the admin approval queue.
 */
const submitForReview = async ({ songId, artistId }) => {
  const song = await findOwnedSongOrThrow(songId, artistId);
  assertTransitionAllowed(song.status, SONG_STATUS.PENDING);

  song.status = SONG_STATUS.PENDING;
  await song.save();

  return song;
};

/**
 * Lists the requesting artist's own songs across all statuses —
 * their personal media-management view.
 */
const listMySongs = async ({ artistId, status, query }) => {
  const { page, limit, skip } = getPaginationParams(query);

  const filter = { artist: artistId };
  if (status) filter.status = status;

  const [items, total] = await Promise.all([
    Song.find(filter).sort({ createdAt: -1 }).skip(skip).limit(limit).lean(),
    Song.countDocuments(filter),
  ]);

  return buildPaginatedResult({ items, total, page, limit });
};

/**
 * Deletes a song the artist owns, provided it hasn't already been
 * published (APPROVED songs should be taken down via admin block,
 * not silently deleted, to preserve analytics/reporting integrity).
 */
const deleteOwnedSong = async ({ songId, artistId }) => {
  const song = await findOwnedSongOrThrow(songId, artistId);

  if (song.status === SONG_STATUS.APPROVED) {
    throw new ApiError(
      409,
      "Published songs cannot be deleted directly. Contact an admin to have it blocked."
    );
  }

  await song.deleteOne();
  return { songId };
};

export default {
  createSongDraft,
  submitForReview,
  listMySongs,
  deleteOwnedSong,
};
