/**
 * ============================================================
 * BaseMediaCardSkeleton
 * ============================================================
 *
 * Loading Skeleton for BaseMediaCard
 *
 * Supported:
 * - Song
 * - Album
 * - Artist
 * - Playlist
 *
 * Future:
 * - Compact Variant
 * - Horizontal Variant
 * - Hero Variant
 * ============================================================
 */

import { memo } from "react";
import Skeleton from "../skeleton/Skeleton";

const BaseMediaCardSkeleton = memo(
  ({
    imageHeight = "aspect-square",
    showSubtitle = true,
    showDescription = true,
    className = "",
  }) => {
    return (
      <article
        className={`
            group
            flex
            flex-col
            gap-3
            rounded-2xl
            bg-zinc-900/40
            p-3
            ${className}
        `}
        aria-hidden="true"
      >
        {/* Cover */}
        <Skeleton
          className={`
              w-full
              ${imageHeight}
              rounded-xl
          `}
        />

        {/* Content */}
        <div className="space-y-2">

          {/* Title */}
          <Skeleton className="h-5 w-3/4 rounded-md" />

          {/* Subtitle */}
          {showSubtitle && (
            <Skeleton className="h-4 w-1/2 rounded-md" />
          )}

          {/* Description */}
          {showDescription && (
            <>
              <Skeleton className="h-3 w-full rounded-md" />
              <Skeleton className="h-3 w-5/6 rounded-md" />
            </>
          )}

        </div>

        {/* Bottom Meta */}
        <div className="flex items-center justify-between pt-2">

          <Skeleton className="h-4 w-20 rounded-md" />

          <Skeleton className="h-10 w-10 rounded-full" />

        </div>
      </article>
    );
  }
);

BaseMediaCardSkeleton.displayName =
  "BaseMediaCardSkeleton";

export default BaseMediaCardSkeleton;