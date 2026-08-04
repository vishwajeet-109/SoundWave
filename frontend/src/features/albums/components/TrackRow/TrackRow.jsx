import { useState } from "react";
import { Music, Play } from "lucide-react";

import { formatTrackDuration } from "../../utils/formatDuration";

export default function TrackRow({ track, index }) {
  const [coverFailed, setCoverFailed] = useState(false);
  const trackTitle = track?.title ?? "Untitled track";
  const trackDuration = track?.duration ?? 0;

  return (
    <div
      className="
        group grid grid-cols-[2rem_1fr_auto] items-center gap-4
        rounded-xl px-4 py-3
        transition-colors duration-150
        hover:bg-white/5
      "
    >
      <div className="flex h-4 w-8 items-center justify-center text-sm text-text-secondary">
        <span className="group-hover:hidden">{index}</span>

        <button
          type="button"
          disabled
          title="Playback isn't available yet"
          aria-label={`Play ${trackTitle} — not yet available`}
          className="hidden cursor-not-allowed items-center justify-center text-text/60 group-hover:flex"
        >
          <Play
            size={14}
            fill="currentColor"
          />
        </button>
      </div>

      <div className="flex min-w-0 items-center gap-3">
        {track?.coverImage && !coverFailed ? (
          <img
            src={track.coverImage}
            alt=""
            onError={() => setCoverFailed(true)}
            className="h-10 w-10 shrink-0 rounded-lg border border-border object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-surface">
            <Music
              size={16}
              className="text-text-secondary"
            />
          </div>
        )}

        <span className="truncate text-sm font-medium text-text">
          {trackTitle}
        </span>
      </div>

      <span className="text-sm tabular-nums text-text-secondary">
        {formatTrackDuration(trackDuration)}
      </span>
    </div>
  );
}
