import {
  Pause,
  Play,
  Repeat,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";

export default function PlayerControls() {
  const {
    isPlaying,
    shuffle,
    repeat,

    togglePlayPause,
    playNext,
    playPrevious,

    toggleShuffle,
    toggleRepeat,
  } = usePlayerContext();

  return (
    <div className="mb-3 flex items-center justify-center gap-5">

      <button
        onClick={toggleShuffle}
        className={`transition ${
          shuffle
            ? "text-green-500"
            : "text-zinc-500 hover:text-white"
        }`}
      >
        <Shuffle size={18} />
      </button>

      <button
        onClick={playPrevious}
        className="text-zinc-300 transition hover:text-white"
      >
        <SkipBack size={22} />
      </button>

      <button
        onClick={togglePlayPause}
        className="
          flex
          h-12
          w-12
          items-center
          justify-center
          rounded-full
          bg-white
          text-black
          transition
          hover:scale-105
        "
      >
        {isPlaying ? (
          <Pause size={22} fill="currentColor" />
        ) : (
          <Play size={22} fill="currentColor" />
        )}
      </button>

      <button
        onClick={playNext}
        className="text-zinc-300 transition hover:text-white"
      >
        <SkipForward size={22} />
      </button>

      <button
        onClick={toggleRepeat}
        className={`transition ${
          repeat
            ? "text-green-500"
            : "text-zinc-500 hover:text-white"
        }`}
      >
        <Repeat size={18} />
      </button>

    </div>
  );
}