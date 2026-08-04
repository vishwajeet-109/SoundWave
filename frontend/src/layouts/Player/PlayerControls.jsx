import {
  Pause,
  Play,
  Repeat2,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react";

export default function PlayerControls({
  isPlaying = true,
  onPlayPause,
  onPrevious,
  onNext,
  onShuffle,
  onRepeat,
}) {
  return (
    <div className="flex items-center justify-center gap-5">
      <button
  type="button"
  aria-label="Shuffle"
  onClick={onShuffle}
  className="text-zinc-500 transition hover:text-white"
>
  <Shuffle size={18} />
</button>

<button
  type="button"
  aria-label="Previous song"
  onClick={onPrevious}
  className="transition hover:text-primary"
>
  <SkipBack size={20} />
</button>

<button
  type="button"
  aria-label={isPlaying ? "Pause" : "Play"}
  onClick={onPlayPause}
  className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-black transition-all duration-200 hover:scale-110 active:scale-95"
>
  {isPlaying ? (
    <Pause size={20} />
  ) : (
    <Play className="ml-0.5" size={20} />
  )}
</button>

<button
  type="button"
  aria-label="Next song"
  onClick={onNext}
  className="transition hover:text-primary"
>
  <SkipForward size={20} />
</button>

<button
  type="button"
  aria-label="Repeat"
  onClick={onRepeat}
  className="text-zinc-500 transition hover:text-white"
>
  <Repeat2 size={18} />
</button>
    </div>
  );
}