import { forwardRef, useState } from "react";
import { Eye, EyeOff, LoaderCircle } from "lucide-react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";

const inputVariants = cva(
  [
    "flex h-11 w-full items-center rounded-xl",
    "border bg-transparent",
    "px-4 text-sm",
    "transition-all duration-200",
    "outline-none",
    "placeholder:text-zinc-500",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "focus:ring-2",
  ].join(" "),
  {
    variants: {
      variant: {
        default:
          "border-zinc-700 bg-zinc-900 text-white focus:border-green-500 focus:ring-green-500/30",

        error:
          "border-red-500 bg-zinc-900 text-white focus:border-red-500 focus:ring-red-500/30",

        success:
          "border-green-500 bg-zinc-900 text-white focus:border-green-500 focus:ring-green-500/30",
      },

      size: {
        sm: "h-9 text-sm",

        md: "h-11 text-sm",

        lg: "h-12 text-base",
      },
    },

    defaultVariants: {
      variant: "default",
      size: "md",
    },
  }
);

const Input = forwardRef(
  (
    {
      type = "text",

      variant,

      size,

      loading = false,

      leftIcon,

      rightIcon,

      className,

      disabled,

      ...props
    },
    ref
  ) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputType =
      type === "password"
        ? showPassword
          ? "text"
          : "password"
        : type;

    return (
      <div className="relative w-full">
        {leftIcon && (
          <div className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-zinc-400">
            {leftIcon}
          </div>
        )}

        <input
          ref={ref}
          type={inputType}
          disabled={disabled || loading}
          className={cn(
            inputVariants({
              variant,
              size,
            }),

            leftIcon && "pl-10",

            (rightIcon || type === "password" || loading) &&
              "pr-10",

            className
          )}
          {...props}
        />

        {loading ? (
          <LoaderCircle
            size={18}
            className="absolute right-3 top-1/2 -translate-y-1/2 animate-spin text-zinc-400"
          />
        ) : type === "password" ? (
          <button
            type="button"
            tabIndex={-1}
            onClick={() =>
              setShowPassword((prev) => !prev)
            }
            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 transition-colors hover:text-white"
          >
            {showPassword ? (
              <EyeOff size={18} />
            ) : (
              <Eye size={18} />
            )}
          </button>
        ) : (
          rightIcon && (
            <div className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400">
              {rightIcon}
            </div>
          )
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;