import { forwardRef } from "react";
import { User } from "lucide-react";
import { cn } from "@/shared/lib/cn";

const sizes = {
  xs: "h-8 w-8",
  sm: "h-10 w-10",
  md: "h-12 w-12",
  lg: "h-16 w-16",
  xl: "h-24 w-24",
};

const Avatar = forwardRef(
  (
    {
      src,
      alt = "Avatar",
      size = "md",
      online = false,
      verified = false,
      className,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(
          "relative inline-flex shrink-0 overflow-hidden rounded-full bg-zinc-800",
          sizes[size],
          className
        )}
        {...props}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User className="text-zinc-400" />
          </div>
        )}

        {online && (
          <span className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 border-zinc-900 bg-green-500" />
        )}

        {verified && (
          <span className="absolute right-0 top-0 flex h-5 w-5 items-center justify-center rounded-full bg-blue-500 text-[10px] text-white">
            ✓
          </span>
        )}
      </div>
    );
  }
);

Avatar.displayName = "Avatar";

export default Avatar;