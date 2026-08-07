/**
 * ============================================================
 * SectionSkeleton
 * ============================================================
 *
 * Universal Section Skeleton
 *
 * Used By
 * ----------
 * Home
 * Search
 * Library
 * Album
 * Artist
 * Playlist
 *
 * Internally uses:
 * BaseMediaCardSkeleton
 *
 * Future
 * ----------
 * - Virtual Loading
 * - Infinite Loading
 * - Horizontal Skeleton
 * ============================================================
 */

import { memo } from "react";
import BaseMediaCardSkeleton from "../BaseMediaCard/BaseMediaCardSkeleton";

const SectionSkeleton = memo(
  ({
    count = 6,

    className = "",

    minWidth = "180px",
  }) => {
    return (
      <div
        className={`grid gap-6 ${className}`}
        style={{
          gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}, 1fr))`,
        }}
      >
        {Array.from({ length: count }).map((_, index) => (
          <BaseMediaCardSkeleton
            key={index}
          />
        ))}
      </div>
    );
  }
);

SectionSkeleton.displayName =
  "SectionSkeleton";

export default SectionSkeleton;
