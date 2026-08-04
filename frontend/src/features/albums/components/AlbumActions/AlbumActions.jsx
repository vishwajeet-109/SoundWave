import { Play, Shuffle, Heart, Share2 } from "lucide-react";

// No player state/store exists yet in the app (features/player and
// src/store are both empty, PlayerBar is a static shell), the Like
// endpoint only supports songs (not albums — see backend/models/Like.js),
// and there is no share endpoint. So these actions stay visually present
// (structurally ready for future wiring) but disabled — they never
// pretend to succeed.

export default function AlbumActions() {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        disabled
        title="Playback isn't available yet"
        aria-label="Play album — not yet available"
        className="flex h-14 w-14 cursor-not-allowed items-center justify-center rounded-full bg-primary/50 text-black/70 transition"
      >
        <Play
          size={24}
          fill="currentColor"
        />
      </button>

      <button
        type="button"
        disabled
        title="Shuffle isn't available yet"
        aria-label="Shuffle album — not yet available"
        className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full text-text-secondary/50 transition"
      >
        <Shuffle size={22} />
      </button>

      <button
        type="button"
        disabled
        title="Liking albums isn't available yet"
        aria-label="Like album — not yet available"
        className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full text-text-secondary/50 transition"
      >
        <Heart size={22} />
      </button>

      <button
        type="button"
        disabled
        title="Sharing isn't available yet"
        aria-label="Share album — not yet available"
        className="flex h-11 w-11 cursor-not-allowed items-center justify-center rounded-full text-text-secondary/50 transition"
      >
        <Share2 size={20} />
      </button>
    </div>
  );
}
