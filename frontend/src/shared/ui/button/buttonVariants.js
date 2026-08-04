import { cva } from "class-variance-authority";

export const buttonVariants = cva(
    [
        "inline-flex",
        "items-center",
        "justify-center",
        "gap-2",
        "whitespace-nowrap",
        "rounded-xl",
        "font-medium",
        "transition-all",
        "duration-200",
        "outline-none",
        "select-none",
        "disabled:pointer-events-none",
        "disabled:opacity-50",
        "focus-visible:ring-2",
        "focus-visible:ring-primary",
        "active:scale-[0.98]",
    ].join(" "),
    {
        variants: {
            variant: {
                primary:
                    "bg-primary text-black hover:opacity-90",

                secondary:
                    "bg-surface border border-border text-white hover:bg-surface-secondary",

                outline:
                    "border border-border bg-transparent hover:bg-surface",

                ghost:
                    "bg-transparent hover:bg-surface-secondary",

                danger:
                    "bg-danger text-white",

                success:
                    "bg-success text-white",
            },

            size: {
                xs: "h-8 px-3 text-xs",

                sm: "h-9 px-4 text-sm",

                md: "h-11 px-5",

                lg: "h-12 px-6",

                xl: "h-14 px-8 text-lg",

                icon: "h-11 w-11",
            },

            fullWidth: {
                true: "w-full",
            },
        },

        defaultVariants: {
            variant: "primary",
            size: "md",
        },
    }
);