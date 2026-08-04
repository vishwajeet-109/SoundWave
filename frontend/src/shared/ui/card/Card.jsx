import { forwardRef } from "react";
import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const cardVariants = cva(
  "rounded-2xl border transition-all duration-300",
  {
    variants: {
      variant: {
        default:
          "border-zinc-800 bg-zinc-900",

        elevated:
          "border-zinc-800 bg-zinc-900 shadow-lg",

        outline:
          "border-zinc-700 bg-transparent",

        glass:
          "border-white/10 bg-white/5 backdrop-blur-xl",

        interactive:
          "border-zinc-800 bg-zinc-900 hover:-translate-y-1 hover:border-green-500 hover:shadow-xl cursor-pointer",
      },

      padding: {
        none: "p-0",
        sm: "p-3",
        md: "p-5",
        lg: "p-7",
      },
    },

    defaultVariants: {
      variant: "default",
      padding: "md",
    },
  }
);

const Card = forwardRef(
  (
    {
      variant,
      padding,
      className,
      children,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          cardVariants({
            variant,
            padding,
          }),
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";

export default Card;