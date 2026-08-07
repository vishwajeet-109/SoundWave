/**
 * ============================================================
 * SectionHeader
 * ============================================================
 *
 * Universal Section Header
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
 * Features
 * ----------
 * ✓ Responsive
 * ✓ Title
 * ✓ Subtitle
 * ✓ Right Action Slot
 * ✓ View All Support
 * ✓ Accessibility
 *
 * Future
 * ----------
 * - Breadcrumb
 * - Filter
 * - Sort
 * - Search
 * - Tabs
 * ============================================================
 */

import { memo } from "react";

/**
 * Universal Section Header
 */
const SectionHeader = memo(
  ({
    title,

    subtitle,

    action,

    onViewAll,

    viewAllLabel = "Show all",

    className = "",
  }) => {
    return (
      <header
        className={`
            flex
            items-end
            justify-between
            gap-4
            ${className}
        `}
      >
        {/* Left */}

        <div className="min-w-0 flex-1">

          {title && (
            <h2
              className="
                  truncate
                  text-2xl
                  font-bold
                  tracking-tight
                  text-white
              "
            >
              {title}
            </h2>
          )}

          {subtitle && (
            <p
              className="
                  mt-1
                  truncate
                  text-sm
                  text-zinc-400
              "
            >
              {subtitle}
            </p>
          )}

        </div>

        {/* Right */}

        <div className="flex items-center gap-3">

          {action}

          {onViewAll && (
            <button
              type="button"
              onClick={onViewAll}
              className="
                  rounded-md
                  px-3
                  py-1.5

                  text-sm
                  font-medium

                  text-zinc-300

                  transition-colors

                  hover:text-white
                  hover:bg-zinc-800

                  focus:outline-none
                  focus:ring-2
                  focus:ring-green-500
              "
            >
              {viewAllLabel}
            </button>
          )}

        </div>

      </header>
    );
  }
);

SectionHeader.displayName = "SectionHeader";

export default SectionHeader;