/**
 * ============================================================
 * BaseMediaCard Constants
 * ============================================================
 *
 * Shared constants used by every BaseMediaCard variant.
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

/**
 * Default placeholder image.
 *
 * NOTE:
 * Replace with local asset after design system is finalized.
 */
export const DEFAULT_MEDIA_IMAGE =
  "https://placehold.co/600x600/18181b/ffffff?text=♪";

/**
 * Default image per media type.
 */
export const MEDIA_PLACEHOLDERS = Object.freeze({
  [MEDIA_TYPES.SONG]: DEFAULT_MEDIA_IMAGE,
  [MEDIA_TYPES.ALBUM]: DEFAULT_MEDIA_IMAGE,
  [MEDIA_TYPES.ARTIST]: DEFAULT_MEDIA_IMAGE,
  [MEDIA_TYPES.PLAYLIST]: DEFAULT_MEDIA_IMAGE,
});

/**
 * Card variants.
 */
export const CARD_VARIANTS = Object.freeze({
  DEFAULT: "default",
  COMPACT: "compact",
  HORIZONTAL: "horizontal",
  HERO: "hero",
});

/**
 * Card sizes.
 */
export const CARD_SIZES = Object.freeze({
  XS: "xs",
  SM: "sm",
  MD: "md",
  LG: "lg",
});

/**
 * Image sizes.
 */
export const IMAGE_SIZE = Object.freeze({
  xs: 48,
  sm: 72,
  md: 160,
  lg: 220,
});

/**
 * Border Radius
 */
export const CARD_RADIUS = Object.freeze({
  xs: "rounded-lg",
  sm: "rounded-xl",
  md: "rounded-2xl",
  lg: "rounded-3xl",
});

/**
 * Hover animation.
 */
export const HOVER_ANIMATION = Object.freeze({
  scale: 1.02,
  imageScale: 1.08,
  duration: 0.25,
});

/**
 * Play button size.
 */
export const PLAY_BUTTON = Object.freeze({
  sm: 40,
  md: 48,
  lg: 56,
});

/**
 * Badge variants.
 */
export const BADGE_VARIANTS = Object.freeze({
  VERIFIED: "verified",
  EXPLICIT: "explicit",
  PREMIUM: "premium",
  NEW: "new",
});

/**
 * Badge colors.
 */
export const BADGE_COLORS = Object.freeze({
  verified: "bg-blue-500",
  explicit: "bg-zinc-800",
  premium: "bg-green-500",
  new: "bg-pink-500",
});

/**
 * Card spacing.
 */
export const CARD_SPACING = Object.freeze({
  xs: "gap-2",
  sm: "gap-3",
  md: "gap-4",
  lg: "gap-5",
});

/**
 * Default transition.
 */
export const CARD_TRANSITION =
  "transition-all duration-300 ease-out";

/**
 * Shadow.
 */
export const CARD_SHADOW =
  "shadow-lg hover:shadow-2xl";

/**
 * Background.
 */
export const CARD_BACKGROUND =
  "bg-zinc-900/70 backdrop-blur-md";

/**
 * Border.
 */
export const CARD_BORDER =
  "border border-white/5";

/**
 * Focus Ring.
 */
export const CARD_FOCUS =
  "focus:outline-none focus:ring-2 focus:ring-green-500";

/**
 * Future feature flags.
 */
export const FUTURE_FEATURES = Object.freeze({
  dragDrop: false,
  contextMenu: false,
  queue: false,
  share: false,
  download: false,
  collaborative: false,
});