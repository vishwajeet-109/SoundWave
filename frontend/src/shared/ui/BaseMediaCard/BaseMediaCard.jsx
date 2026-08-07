/**
 * ============================================================
 * BaseMediaCard
 * ============================================================
 *
 * Universal Media Card
 *
 * Supported
 * ----------
 * ✓ Song
 * ✓ Album
 * ✓ Artist
 * ✓ Playlist
 *
 * Future
 * ----------
 * Podcast
 * Episode
 * Audiobook
 * Radio
 *
 * This component NEVER directly depends on
 * backend response structure.
 *
 * Backend data
 * ↓
 * normalizeMedia()
 * ↓
 * Variant Config
 * ↓
 * Render
 * ============================================================
 */

import { memo, useMemo, useCallback } from "react";

import BaseMediaCardImage from "./BaseMediaCardImage";
import BaseMediaCardContent from "./BaseMediaCardContent";
import BaseMediaCardActions from "./BaseMediaCardActions";

import {
    normalizeMedia
} from "./baseMediaCard.utils";

import {
    getMediaVariant
} from "./mediaCardVariants";

/**
 * Universal Media Card
 */
const BaseMediaCard = memo(({
    data,
    type,
    className = "",
    onClick,
    onPlay,
    onLike,
    onMenu,
}) => {

    /**
     * Normalize backend model.
     */
    const media = useMemo(() => normalizeMedia(data, type), [data, type]);

    /**
     * Variant configuration.
     */
    const variant = useMemo(() => getMediaVariant(media.type), [media.type]);

    /**
     * Card click.
     */
    const handleClick = useCallback(() => {
        onClick?.(media);
    }, [media, onClick]);

    /**
     * Keyboard support.
     */
    const handleKeyDown = useCallback((event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            handleClick();
        }
    }, [handleClick]);

    return (

        <article

            role="button"

            tabIndex={0}

            aria-label={media.title}

            onClick={handleClick}

            onKeyDown={handleKeyDown}

            className={`
                group

                relative

                cursor-pointer

                rounded-2xl

                bg-zinc-900/60

                border

                border-white/5

                p-3

                transition-all

                duration-300

                hover:bg-zinc-800

                hover:-translate-y-1

                hover:shadow-xl

                focus:outline-none

                focus:ring-2

                focus:ring-green-500

                ${className}
            `}
        >

            {/* Image */}

            <BaseMediaCardImage

                src={media.image}

                alt={media.title}

            >

                {variant.showPlayButton && (

                    <BaseMediaCardActions

                        playable={variant.showPlayButton}

                        liked={media.liked}

                        onPlay={() => onPlay?.(media)}

                        onLike={() => onLike?.(media)}

                        onMenu={() => onMenu?.(media)}

                    />

                )}

            </BaseMediaCardImage>
                        {/* Content */}

            <div className="mt-4">

                <BaseMediaCardContent

                    title={media.title}

                    subtitle={media.subtitle}

                    description={media.description}

                    badge={media.badge}

                    verified={
                        variant.showVerified
                            ? media.verified
                            : false
                    }

                    explicit={
                        variant.showExplicit
                            ? media.explicit
                            : false
                    }

                    followers={
                        variant.showFollowers
                            ? media.followers
                            : null
                    }

                    songsCount={
                        variant.showSongsCount
                            ? media.songsCount
                            : null
                    }

                    duration={
                        variant.showDuration
                            ? media.duration
                            : null
                    }

                />

            </div>

            {/* ------------------------------------------------ */}
            {/* Future Extension Point                           */}
            {/* ------------------------------------------------ */}

            {/*
                TODO (Sprint 5.3)

                - Context Menu
                - Drag & Drop
                - Queue
                - Download
                - Share
                - Selection Mode
                - Collaborative Playlist
                - Offline Badge
                - Recently Played Badge
                - Animated Hover Background
            */}

        </article>

    );

});

BaseMediaCard.displayName =
    "BaseMediaCard";

export default BaseMediaCard;