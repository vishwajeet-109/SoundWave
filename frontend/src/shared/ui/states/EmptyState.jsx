/**
 * ============================================================
 * EmptyState
 * ============================================================
 *
 * Universal Empty State
 *
 * Used By
 * ----------
 * Home
 * Search
 * Library
 * Playlist
 * Artist
 * Album
 *
 * Future
 * ----------
 * - Lottie Animation
 * - CTA Variants
 * ============================================================
 */

import { memo } from "react";

const EmptyState = memo(({
    icon = null,

    title = "Nothing here",

    description = "There is no data available.",

    action = null,

    className = ""
}) => {

    return (

        <div
            className={`
                flex
                flex-col
                items-center
                justify-center
                py-16
                text-center
                ${className}
            `}
        >

            {icon && (
                <div className="mb-5 text-5xl">
                    {icon}
                </div>
            )}

            <h3
                className="
                    text-xl
                    font-semibold
                    text-white
                "
            >
                {title}
            </h3>

            <p
                className="
                    mt-2
                    max-w-md
                    text-sm
                    text-zinc-400
                "
            >
                {description}
            </p>

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}

        </div>

    );

});

EmptyState.displayName = "EmptyState";
export { EmptyState };
export default EmptyState;