import { cn } from "@/shared/lib/cn";

export default function Skeleton({
  className,
}) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-xl bg-zinc-800",
        className
      )}
    />
  );
}