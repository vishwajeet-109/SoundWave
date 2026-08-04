import { useState } from "react";

export default function ProgressBar() {
  const [progress] = useState(32);

  return (
    <div className="group flex w-full items-center gap-3">

      <span className="w-10 text-xs text-zinc-500">
        1:20
      </span>

      <div className="relative h-1 flex-1 rounded-full bg-zinc-700">

        <div
          className="h-full rounded-full bg-primary"
          style={{
            width: `${progress}%`,
          }}
        />

        <div
          className="
            absolute
            top-1/2
            hidden
            h-3
            w-3
            -translate-y-1/2
            rounded-full
            bg-white
            group-hover:block
          "
          style={{
            left: `calc(${progress}% - 6px)`,
          }}
        />

      </div>

      <span className="w-10 text-xs text-zinc-500">
        4:12
      </span>

    </div>
  );
}