import {
  Heart,
  Pause,
  Play,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat2,
} from "lucide-react";

import { usePlayer } from "@/context/usePlayer";

import ProgressBar from "./ProgressBar";
import VolumeSlider from "./VolumeSlider";

const PLACEHOLDER =
  "https://placehold.co/56x56/18181b/ffffff?text=%E2%99%AA";

export default function PlayerBar() {
  const {
    currentSong,
    isPlaying,
    togglePlayPause,
    playNext,
    playPrevious,
    toggleShuffle,
    toggleRepeat,
  } = usePlayer();

  const cover =
    currentSong?.coverImage ||
    currentSong?.cover ||
    PLACEHOLDER;

  return (
    <footer
      className="
        fixed
        bottom-0
        left-0
        right-0
        z-50
        h-24
        border-t
        border-zinc-800
        bg-zinc-950/95
        backdrop-blur-xl
      "
    >
      <div className="grid h-full grid-cols-3 items-center px-6">
        {/* Song */}

        <div className="flex items-center gap-4">
          <img
            src={cover}
            alt={currentSong?.title ?? "No song"}
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER;
            }}
            className="h-14 w-14 rounded-xl object-cover"
          />

          <div className="min-w-0">
            <h4 className="truncate font-medium">
              {currentSong?.title ?? "No song playing"}
            </h4>

            <p className="truncate text-sm text-zinc-500">
              {currentSong?.artist?.name ?? ""}
            </p>
          </div>

          <button
            type="button"
            aria-label="Like song"
            className="ml-3 text-zinc-500 transition hover:text-primary"
          >
            <Heart size={18} />
          </button>
        </div>

        {/* Controls */}

        <div className="flex flex-col items-center gap-3">
        <div className="flex flex-col items-center gap-3">
  <div className="flex items-center gap-5">

    <button
      type="button"
      aria-label="Shuffle"
      onClick={toggleShuffle}
      className="text-zinc-500 transition hover:text-white"
    >
      <Shuffle size={18} />
    </button>

    <button
      type="button"
      aria-label="Previous song"
      onClick={playPrevious}
      className="transition hover:text-primary"
    >
      <SkipBack size={20} />
    </button>

    <button
      type="button"
      aria-label={isPlaying ? "Pause" : "Play"}
      onClick={togglePlayPause}
      className="
        flex
        h-10
        w-10
        items-center
        justify-center
        rounded-full
        bg-white
        text-black
        transition
        hover:scale-110
        active:scale-95
      "
    >
      {isPlaying ? (
        <Pause size={20} />
      ) : (
        <Play
          size={20}
          className="ml-0.5"
          fill="currentColor"
        />
      )}
    </button>

    <button
      type="button"
      aria-label="Next song"
      onClick={playNext}
      className="transition hover:text-primary"
    >
      <SkipForward size={20} />
    </button>

    <button
      type="button"
      aria-label="Repeat"
      onClick={toggleRepeat}
      className="text-zinc-500 transition hover:text-white"
    >
      <Repeat2 size={18} />
    </button>

  </div>

  <ProgressBar />
</div>

          <ProgressBar />
        </div>

        {/* Volume */}

        <div className="flex justify-end">
          <VolumeSlider />
        </div>
      </div>
    </footer>
  );
}