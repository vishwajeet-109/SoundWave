import { forwardRef, useId } from "react";
import { cn } from "@/shared/lib/cn";

const Radio = forwardRef(
  (
    {
      id,
      label,
      description,
      className,
      disabled,
      ...props
    },
    ref
  ) => {
    const generatedId = useId();
    const inputId = id || generatedId;

    return (
      <label
        htmlFor={inputId}
        className={cn(
          "flex cursor-pointer items-start gap-3",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
      >
        <input
          id={inputId}
          ref={ref}
          type="radio"
          className="peer sr-only"
          disabled={disabled}
          {...props}
        />

        <div
          className={cn(
            "flex h-5 w-5 items-center justify-center rounded-full",
            "border border-zinc-600 bg-zinc-900",
            "transition-all duration-200",
            "peer-focus-visible:ring-2 peer-focus-visible:ring-green-500",
            "peer-checked:border-green-500"
          )}
        >
          <div className="h-2.5 w-2.5 scale-0 rounded-full bg-green-500 transition-transform duration-200 peer-checked:scale-100" />
        </div>

        <div className="flex flex-col">
          {label && (
            <span className="text-sm font-medium text-zinc-100">
              {label}
            </span>
          )}

          {description && (
            <span className="text-xs text-zinc-400">
              {description}
            </span>
          )}
        </div>
      </label>
    );
  }
);

Radio.displayName = "Radio";

export default Radio;