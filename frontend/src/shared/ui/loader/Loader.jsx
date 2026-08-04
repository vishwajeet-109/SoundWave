import { LoaderCircle } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const sizes = {
  sm: "h-5 w-5",
  md: "h-8 w-8",
  lg: "h-12 w-12",
};

export default function Loader({
  variant = "spinner",
  size = "md",
  text,
  className,
}) {
  if (variant === "page") {
    return (
      <div
        className={cn(
          "flex min-h-screen flex-col items-center justify-center gap-5",
          className
        )}
      >
        <LoaderCircle
          className={cn(
            "animate-spin text-primary",
            sizes[size]
          )}
        />

        {text && (
          <p className="text-sm text-zinc-400">
            {text}
          </p>
        )}
      </div>
    );
  }

  if (variant === "music") {
    return (
      <div
        className={cn(
          "flex items-end gap-1",
          className
        )}
      >
        {[0, 1, 2, 3].map((bar) => (
          <span
            key={bar}
            className="h-6 w-1 animate-[music_0.9s_ease-in-out_infinite] rounded-full bg-primary"
            style={{
              animationDelay: `${bar * 0.15}s`,
            }}
          />
        ))}
      </div>
    );
  }

  return (
    <LoaderCircle
      className={cn(
        "animate-spin text-primary",
        sizes[size],
        className
      )}
    />
  );
}