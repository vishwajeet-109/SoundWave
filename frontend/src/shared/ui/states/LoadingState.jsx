/**
 * ============================================================
 * LoadingState
 * ============================================================
 */

import { memo } from "react";

const LoadingState = memo(({

    message = "Loading...",

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
                ${className}
            `}
        >

            <div
                className="
                    h-10
                    w-10
                    animate-spin
                    rounded-full
                    border-4
                    border-zinc-700
                    border-t-green-500
                "
            />

            <p
                className="
                    mt-4
                    text-sm
                    text-zinc-400
                "
            >
                {message}
            </p>

        </div>

    );

});

LoadingState.displayName = "LoadingState";

export default LoadingState;