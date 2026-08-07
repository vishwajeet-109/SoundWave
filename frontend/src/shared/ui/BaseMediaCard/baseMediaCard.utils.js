/**
 * ============================================================
 * BaseMediaCard Utils
 * ============================================================
 *
 * Shared normalization helpers.
 *
 * Every backend model is converted into one common shape
 * so BaseMediaCard never depends on backend structure.
 *
 * Supported:
 * - Song
 * - Album
 * - Artist
 * - Playlist
 *
 * Future:
 * - Podcast
 * - Audiobook
 * - Episode
 * ============================================================
 */

import { MEDIA_TYPES } from "./baseMediaCard.types";
import { DEFAULT_MEDIA_IMAGE } from "./baseMediaCard.constants";

/**
 * Safe image getter.
 */
export function getImage(image) {
  if (!image) return DEFAULT_MEDIA_IMAGE;

  if (typeof image === "string") return image;

  if (image?.url) return image.url;

  return DEFAULT_MEDIA_IMAGE;
}

/**
 * Normalize Song
 */
export function normalizeSong(song = {}) {
  return {
    id: song._id,

    type: MEDIA_TYPES.SONG,

    image: getImage(song.coverImage),

    title: song.title || "Unknown Song",

    subtitle:
      song.artist?.name ||
      song.artistName ||
      "Unknown Artist",

    description:
      song.album?.name ||
      song.albumName ||
      "",

    badge: null,

    duration: song.duration,

    followers: null,

    songsCount: null,

    verified: false,

    explicit: Boolean(song.explicit),

    liked: Boolean(song.liked),

    playable: true,

    raw: song,
  };
}

/**
 * Normalize Album
 */
export function normalizeAlbum(album = {}) {
  return {
    id: album._id,

    type: MEDIA_TYPES.ALBUM,

    image: getImage(album.coverImage),

    title: album.name || "Unknown Album",

    subtitle:
      album.artist?.name ||
      album.artistName ||
      "Unknown Artist",

    description: "",

    badge: null,

    duration: null,

    followers: null,

    songsCount:
      album.songCount ??
      album.songs?.length ??
      0,

    verified: false,

    explicit: false,

    liked: Boolean(album.liked),

    playable: true,

    raw: album,
  };
}

/**
 * Normalize Artist
 */
export function normalizeArtist(artist = {}) {
  return {
    id: artist._id,

    type: MEDIA_TYPES.ARTIST,

    image: getImage(
      artist.image ||
      artist.avatar
    ),

    title: artist.name || "Unknown Artist",

    subtitle: "Artist",

    description: "",

    badge: artist.verified
      ? "verified"
      : null,

    duration: null,

    followers:
      artist.followersCount ??
      artist.followers ??
      0,

    songsCount: null,

    verified: Boolean(
      artist.verified
    ),

    explicit: false,

    liked: false,

    playable: false,

    raw: artist,
  };
}

/**
 * Normalize Playlist
 */
export function normalizePlaylist(
  playlist = {}
) {
  return {
    id: playlist._id,

    type: MEDIA_TYPES.PLAYLIST,

    image: getImage(playlist.image),

    title:
      playlist.name ||
      "Untitled Playlist",

    subtitle:
      playlist.owner?.name ||
      playlist.user?.name ||
      "",

    description:
      playlist.description || "",

    badge: null,

    duration: null,

    followers: null,

    songsCount:
      playlist.songCount ??
      playlist.songs?.length ??
      0,

    verified: false,

    explicit: false,

    liked: Boolean(
      playlist.liked
    ),

    playable: true,

    raw: playlist,
  };
}

/**
 * Normalize Any Media
 */
export function normalizeMedia(
  data,
  type
) {
  switch (type) {
    case MEDIA_TYPES.SONG:
      return normalizeSong(data);

    case MEDIA_TYPES.ALBUM:
      return normalizeAlbum(data);

    case MEDIA_TYPES.ARTIST:
      return normalizeArtist(data);

    case MEDIA_TYPES.PLAYLIST:
      return normalizePlaylist(data);

    default:
      return data;
  }
}