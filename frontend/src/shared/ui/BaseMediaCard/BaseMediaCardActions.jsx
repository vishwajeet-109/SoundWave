/**
 * ============================================================
 * BaseMediaCardActions
 * ============================================================
 *
 * Shared action layer used by every media card.
 *
 * Supported
 * ----------
 * ✓ Play
 * ✓ Like
 * ✓ Menu
 *
 * Future
 * ----------
 * - Queue
 * - Download
 * - Share
 * - Add To Playlist
 * - Multi Select
 * ============================================================
 */

import { memo, useCallback } from "react";

/**
 * Shared Card Actions
 */
const BaseMediaCardActions = memo(
  ({
    playable = true,

    liked = false,

    disabled = false,

    onPlay,

    onLike,

    onMenu,
  }) => {

    const handlePlay = useCallback(
      (e) => {
        e.stopPropagation();

        if (disabled) return;

        onPlay?.();
      },
      [disabled, onPlay]
    );

    const handleLike = useCallback(
      (e) => {
        e.stopPropagation();

        if (disabled) return;

        onLike?.();
      },
      [disabled, onLike]
    );

    const handleMenu = useCallback(
      (e) => {
        e.stopPropagation();

        if (disabled) return;

        onMenu?.();
      },
      [disabled, onMenu]
    );

    return (
      <div
        className="
            absolute
            right-3
            bottom-3

            flex
            items-center
            gap-2

            opacity-0
            translate-y-2

            group-hover:opacity-100
            group-hover:translate-y-0

            transition-all
            duration-300
        "
      >

        {playable && (
          <button
            type="button"
            aria-label="Play"

            onClick={handlePlay}

            disabled={disabled}

            className="
                flex
                h-11
                w-11

                items-center
                justify-center

                rounded-full

                bg-green-500

                text-black

                shadow-xl

                transition

                hover:scale-110
                active:scale-95
            "
          >
            ▶
          </button>
        )}

        <button
          type="button"

          aria-label="Like"

          onClick={handleLike}

          disabled={disabled}

          className="
                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-full

                bg-zinc-900/90

                text-white

                transition

                hover:bg-zinc-800
          "
        >
          {liked ? "♥" : "♡"}
        </button>

        <button
          type="button"

          aria-label="More"

          onClick={handleMenu}

          disabled={disabled}

          className="
                flex
                h-9
                w-9

                items-center
                justify-center

                rounded-full

                bg-zinc-900/90

                text-white

                transition

                hover:bg-zinc-800
          "
        >
          ⋮
        </button>

      </div>
    );
  }
);

BaseMediaCardActions.displayName =
  "BaseMediaCardActions";

export default BaseMediaCardActions;