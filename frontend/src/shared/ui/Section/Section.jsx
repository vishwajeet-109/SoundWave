/**
 * ============================================================
 * Section
 * ============================================================
 *
 * Universal Section Layout
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
 * Future
 * ----------
 * Dashboard
 * Notifications
 * Profile
 *
 * Features
 * ----------
 * ✓ Responsive
 * ✓ Header Slot
 * ✓ Action Slot
 * ✓ Empty State
 * ✓ Loading State
 * ============================================================
 */

import { memo } from "react";

/**
 * Universal Section Component
 */
const Section = memo(
  ({
    title,

    subtitle,

    action,

    children,

    className = "",

    contentClassName = "",

    loading = false,

    empty = false,

    emptyComponent = null,
  }) => {
    return (
      <section
        className={`
            w-full
            space-y-6
            ${className}
        `}
      >
        {/* Header */}

        {(title || subtitle || action) && (
          <header
            className="
                flex
                items-center
                justify-between
                gap-4
            "
          >
            <div className="min-w-0">
              {title && (
                <h2
                  className="
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
                      text-sm
                      text-zinc-400
                  "
                >
                  {subtitle}
                </p>
              )}
            </div>

            {action && (
              <div className="shrink-0">
                {action}
              </div>
            )}
          </header>
        )}

        {/* Loading */}

        {loading && children}

        {/* Empty */}

        {!loading &&
          empty &&
          emptyComponent}

        {/* Content */}

        {!loading &&
          !empty && (
            <div
              className={`
                  ${contentClassName}
              `}
            >
              {children}
            </div>
          )}
      </section>
    );
  }
);

Section.displayName = "Section";

export default Section;