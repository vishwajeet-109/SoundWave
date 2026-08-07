/**
 * ============================================================
 * BaseMediaCardBadge
 * ============================================================
 *
 * Small reusable badge component for BaseMediaCard.
 *
 * Supports:
 * - Verified
 * - Explicit
 * - Premium
 * - New
 *
 * Future:
 * - Dolby
 * - Hi-Res
 * - Lossless
 * * - Offline
 * ============================================================
 */

import { memo } from "react";
import { BADGE_VARIANTS } from "./baseMediaCard.constants";

/**
 * Badge Component
 */
const BaseMediaCardBadge = memo(
  ({
    variant = BADGE_VARIANTS.NEW,
    children,
    className = "",
  }) => {
    const variants = {
      verified:
        "bg-blue-600 text-white",

      explicit:
        "bg-zinc-800 text-zinc-100",

      premium:
        "bg-emerald-600 text-white",

      new:
        "bg-pink-600 text-white",
    };

    return (
      <span
        className={`
            inline-flex
            items-center
            justify-center
            rounded-full
            px-2.5
            py-1
            text-[11px]
            font-semibold
            tracking-wide
            whitespace-nowrap
            select-none
            ${variants[variant]}
            ${className}
        `}
      >
        {children}
      </span>
    );
  }
);

BaseMediaCardBadge.displayName =
  "BaseMediaCardBadge";

export default BaseMediaCardBadge;