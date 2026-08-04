import { cloneElement, isValidElement, useId } from "react";
import { cn } from "@/shared/lib/cn";

export default function Field({
  id,
  label,
  required = false,
  error,
  helperText,
  className,
  children,
}) {
  const generatedId = useId();

  const fieldId = id || generatedId;

  const helperId = `${fieldId}-helper`;
  const errorId = `${fieldId}-error`;

  const describedBy = error
    ? errorId
    : helperText
      ? helperId
      : undefined;

  const child = isValidElement(children)
    ? cloneElement(children, {
        id: fieldId,
        "aria-invalid": !!error,
        "aria-describedby": describedBy,
      })
    : children;

  return (
    <div className={cn("flex w-full flex-col gap-2", className)}>
      {label && (
        <label
          htmlFor={fieldId}
          className="text-sm font-medium text-zinc-100"
        >
          {label}

          {required && (
            <span className="ml-1 text-red-500">*</span>
          )}
        </label>
      )}

      {child}

      {error ? (
        <p
          id={errorId}
          className="text-sm text-red-500"
        >
          {error}
        </p>
      ) : helperText ? (
        <p
          id={helperId}
          className="text-sm text-zinc-400"
        >
          {helperText}
        </p>
      ) : null}
    </div>
  );
}