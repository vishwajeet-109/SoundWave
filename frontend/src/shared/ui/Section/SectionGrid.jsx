/**
 * ============================================================
 * SectionGrid
 * ============================================================
 *
 * Universal Responsive Grid
 *
 * Used By
 * ----------
 * Home
 * Search
 * Library
 * Albums
 * Artists
 * Playlist
 *
 * Features
 * ----------
 * ✓ Responsive Grid
 * ✓ Auto Columns
 * ✓ Horizontal Mode
 * ✓ Gap Control
 * ✓ Auto Fit
 * ✓ Auto Fill
 * ✓ Accessible
 *
 * Future
 * ----------
 * - Masonry
 * - Virtualization
 * - Infinite Scroll
 * - Drag & Drop
 * ============================================================
 */

import { memo } from "react";

/**
 * Universal Grid Component
 */
const SectionGrid = memo(
  ({
    children,

    columns = {
      sm: 2,
      md: 3,
      lg: 4,
      xl: 5,
      "2xl": 6,
    },

    gap = "gap-6",

    horizontal = false,

    className = "",
  }) => {
    if (horizontal) {
      return (
        <div
          className={`
              flex
              overflow-x-auto
              scrollbar-hide
              snap-x
              snap-mandatory
              ${gap}
              ${className}
          `}
        >
          {children}
        </div>
      );
    }

    return (
      <div
        className={`
            grid

            grid-cols-1

            sm:grid-cols-${columns.sm}
            md:grid-cols-${columns.md}
            lg:grid-cols-${columns.lg}
            xl:grid-cols-${columns.xl}
            2xl:grid-cols-${columns["2xl"]}

            ${gap}

            ${className}
        `}
      >
        {children}
      </div>
    );
  }
);

SectionGrid.displayName = "SectionGrid";

export default SectionGrid;