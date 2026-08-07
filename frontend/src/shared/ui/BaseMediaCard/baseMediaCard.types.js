/**
 * ============================================================
 * BaseMediaCard Types
 * ============================================================
 *
 * Shared type definitions for every media card.
 *
 * Supported Types:
 * - song
 * - album
 * - artist
 * - playlist
 *
 * Future:
 * - podcast
 * - audiobook
 * - episode
 * - radio
 * ============================================================
 */

export const MEDIA_TYPES = Object.freeze({
  SONG: "song",
  ALBUM: "album",
  ARTIST: "artist",
  PLAYLIST: "playlist",
});

/**
 * Runtime prop definition reference.
 *
 * NOTE:
 * This is NOT PropTypes.
 * It is a documentation object used across the project.
 */
export const BaseMediaCardShape = Object.freeze({
  id: "",
  type: MEDIA_TYPES.SONG,

  image: "",

  title: "",
  subtitle: "",
  description: "",

  badge: null,

  duration: null,
  followers: null,
  songsCount: null,

  verified: false,
  explicit: false,
  liked: false,

  playable: true,
  loading: false,
  disabled: false,

  onClick: null,
  onPlay: null,
  onLike: null,
  onMenu: null,
});

/**
 * Props accepted by BaseMediaCard.
 */
export const BASE_MEDIA_CARD_PROPS = [
  "id",
  "type",
  "image",
  "title",
  "subtitle",
  "description",
  "badge",
  "duration",
  "followers",
  "songsCount",
  "verified",
  "explicit",
  "liked",
  "playable",
  "loading",
  "disabled",
  "onClick",
  "onPlay",
  "onLike",
  "onMenu",
];

/**
 * Media Types List
 */
export const SUPPORTED_MEDIA_TYPES = Object.freeze(
  Object.values(MEDIA_TYPES)
);

/**
 * Future Feature Flags
 */
export const BASE_MEDIA_CARD_FEATURES = Object.freeze({
  contextMenu: false,
  dragDrop: false,
  queue: false,
  offline: false,
  collaborative: false,
  download: false,
  share: false,
  multiSelect: false,
});