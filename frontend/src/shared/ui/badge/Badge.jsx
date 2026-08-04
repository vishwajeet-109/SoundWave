import { cva } from "class-variance-authority";
import { cn } from "@/shared/lib/cn";

const badgeVariants = cva(
  "inline-flex items-center rounded-full px-3 py-1 text-xs font-medium",
  {
    variants: {
      variant: {
        default: "bg-zinc-800 text-white",

        success: "bg-green-500/20 text-green-400",

        danger: "bg-red-500/20 text-red-400",

        warning: "bg-yellow-500/20 text-yellow-400",

        premium: "bg-yellow-400 text-black",

        info: "bg-blue-500/20 text-blue-400",
      },
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

export default function Badge({
  variant,
  className,
  children,
}) {
  return (
    <span
      className={cn(
        badgeVariants({
          variant,
        }),
        className
      )}
    >
      {children}
    </span>
  );
}