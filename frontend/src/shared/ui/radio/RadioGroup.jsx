import { cn } from "@/shared/lib/cn";

export default function RadioGroup({
  children,
  className,
  orientation = "vertical",
}) {
  return (
    <div
      role="radiogroup"
      className={cn(
        "flex gap-4",
        orientation === "vertical"
          ? "flex-col"
          : "flex-row",
        className
      )}
    >
      {children}
    </div>
  );
}