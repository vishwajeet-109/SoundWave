import { LoaderCircle } from "lucide-react";

import { cn } from "@/shared/lib/cn";

import { buttonVariants } from "./buttonVariants";

export default function Button({

    children,

    className,

    variant,

    size,

    fullWidth,

    loading = false,

    leftIcon,

    rightIcon,

    disabled,

    ...props

}) {

    return (

        <button

            className={cn(

                buttonVariants({

                    variant,

                    size,

                    fullWidth,

                }),

                className

            )}

            disabled={disabled || loading}

            {...props}

        >

            {loading ? (

                <LoaderCircle className="h-4 w-4 animate-spin" />

            ) : (

                leftIcon

            )}

            {children}

            {!loading && rightIcon}

        </button>

    );

}