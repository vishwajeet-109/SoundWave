import { forwardRef, useEffect, useRef } from "react";
import { cva } from "class-variance-authority";

import { cn } from "@/shared/lib/cn";

const textareaVariants = cva(
  [
    "flex w-full rounded-xl",
    "border",
    "bg-transparent",
    "px-4 py-3",
    "text-sm",
    "transition-all duration-200",
    "outline-none",
    "placeholder:text-zinc-500",
    "disabled:cursor-not-allowed",
    "disabled:opacity-50",
    "focus:ring-2",
    "resize-none",
    "overflow-hidden",
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
    },

    defaultVariants: {
      variant: "default",
    },
  }
);

const Textarea = forwardRef(
  (
    {
      variant,
      autoResize = true,
      showCount = false,
      maxLength,
      className,
      value,
      onChange,
      ...props
    },
    ref
  ) => {
    const localRef = useRef(null);

    const textareaRef = ref || localRef;

    useEffect(() => {
      if (!autoResize) return;

      const el = textareaRef.current;

      if (!el) return;

      el.style.height = "0px";
      el.style.height = `${el.scrollHeight}px`;
    }, [value, autoResize, textareaRef]);

    return (
      <div className="w-full">
        <textarea
          ref={textareaRef}
          value={value}
          maxLength={maxLength}
          onChange={onChange}
          className={cn(
            textareaVariants({
              variant,
            }),
            className
          )}
          {...props}
        />

        {showCount && maxLength && (
          <div className="mt-2 flex justify-end text-xs text-zinc-500">
            {(value?.length || 0)} / {maxLength}
          </div>
        )}
      </div>
    );
  }
);

Textarea.displayName = "Textarea";

export default Textarea;