/**
 * ============================================================
 * BaseMediaCardContent
 * ============================================================
 *
 * Shared content renderer for every media card.
 *
 * Supports:
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

import { memo } from "react";
import BaseMediaCardBadge from "./BaseMediaCardBadge";

/**
 * Shared Content Component
 */
const BaseMediaCardContent = memo(
  ({
    title,
    subtitle,
    description,

    badge,

    verified = false,
    explicit = false,

    followers,
    songsCount,
    duration,

    className = "",
  }) => {
    return (
      <div
        className={`
            flex
            flex-col
            gap-1
            min-w-0
            ${className}
        `}
      >
        {/* Title Row */}
        <div className="flex items-center gap-2">

          <h3
            className="
                truncate
                text-sm
                font-semibold
                text-white
            "
          >
            {title}
          </h3>

          {verified && (
            <BaseMediaCardBadge variant="verified">
              ✓
            </BaseMediaCardBadge>
          )}

          {explicit && (
            <BaseMediaCardBadge variant="explicit">
              E
            </BaseMediaCardBadge>
          )}

          {badge && (
            <BaseMediaCardBadge>
              {badge}
            </BaseMediaCardBadge>
          )}

        </div>

        {/* Subtitle */}

        {subtitle && (
          <p
            className="
                truncate
                text-xs
                text-zinc-400
            "
          >
            {subtitle}
          </p>
        )}

        {/* Description */}

        {description && (
          <p
            className="
                line-clamp-2
                text-xs
                text-zinc-500
            "
          >
            {description}
          </p>
        )}

        {/* Meta */}

        {(followers ||
          songsCount ||
          duration) && (
          <div
            className="
                mt-1
                flex
                flex-wrap
                items-center
                gap-2
                text-[11px]
                text-zinc-500
            "
          >
            {followers !== null && followers !== undefined && (
              <span>
                {followers.toLocaleString()} followers
              </span>
            )}

            {songsCount !== null && songsCount !== undefined && (
              <span>
                {songsCount} songs
              </span>
            )}

            {duration !== null && duration !== undefined && (
              <span>{duration}</span>
            )}
          </div>
        )}
      </div>
    );
  }
);

BaseMediaCardContent.displayName =
  "BaseMediaCardContent";

export default BaseMediaCardContent;