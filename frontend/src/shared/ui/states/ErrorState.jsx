/**
 * ============================================================
 * ErrorState
 * ============================================================
 */

import { memo } from "react";

const ErrorState = memo(({

    title = "Something went wrong",

    description = "Please try again.",

    error = null,

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

            <div
                className="
                    mb-5
                    text-5xl
                "
            >
                ⚠️
            </div>

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

            {typeof window !== "undefined" && window.location.hostname === "localhost" && error && (
                    <pre
                        className="
                            mt-6
                            max-w-full
                            overflow-auto
                            rounded-xl
                            bg-zinc-900
                            p-4
                            text-left
                            text-xs
                            text-red-400
                        "
                    >
                        {String(error)}
                    </pre>
                )}

            {action && (
                <div className="mt-6">
                    {action}
                </div>
            )}

        </div>

    );

});

ErrorState.displayName = "ErrorState";

export default ErrorState;