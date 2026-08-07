/**
 * ============================================================
 * BaseMediaCard Variants
 * ============================================================
 *
 * Variant configuration for every media type.
 *
 * This file controls how each media type should render.
 *
 * BaseMediaCard MUST NOT contain large switch statements.
 *
 * Future:
 * - Podcast
 * - Audiobook
 * - Episode
 * - Radio
 * ============================================================
 */

import { MEDIA_TYPES } from "./baseMediaCard.types";

export const MEDIA_CARD_VARIANTS = Object.freeze({
  [MEDIA_TYPES.SONG]: {
    showPlayButton: true,
    showLikeButton: true,
    showMenuButton: true,

    showArtist: true,
    showAlbum: true,

    showFollowers: false,
    showSongsCount: false,
    showDuration: true,

    showVerified: false,
    showExplicit: true,

    imageShape: "square",
  },

  [MEDIA_TYPES.ALBUM]: {
    showPlayButton: true,
    showLikeButton: true,
    showMenuButton: true,

    showArtist: true,
    showAlbum: false,

    showFollowers: false,
    showSongsCount: true,
    showDuration: false,

    showVerified: false,
    showExplicit: false,

    imageShape: "square",
  },

  [MEDIA_TYPES.ARTIST]: {
    showPlayButton: false,
    showLikeButton: true,
    showMenuButton: true,

    showArtist: false,
    showAlbum: false,

    showFollowers: true,
    showSongsCount: false,
    showDuration: false,

    showVerified: true,
    showExplicit: false,

    imageShape: "circle",
  },

  [MEDIA_TYPES.PLAYLIST]: {
    showPlayButton: true,
    showLikeButton: true,
    showMenuButton: true,

    showArtist: false,
    showAlbum: false,

    showFollowers: false,
    showSongsCount: true,
    showDuration: false,

    showVerified: false,
    showExplicit: false,

    imageShape: "square",
  },
});

/**
 * Returns the rendering configuration
 * for a given media type.
 */
export function getMediaVariant(type) {
  return (
    MEDIA_CARD_VARIANTS[type] ??
    MEDIA_CARD_VARIANTS[MEDIA_TYPES.SONG]
  );
}