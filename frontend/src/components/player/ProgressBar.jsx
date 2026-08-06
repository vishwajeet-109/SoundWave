import { usePlayerContext } from "@/context/PlayerContext";

function formatTime(seconds) {
  if (!seconds || Number.isNaN(seconds)) return "0:00";

  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);

  return `${mins}:${secs.toString().padStart(2, "0")}`;
}

export default function ProgressBar() {
  const {
    currentTime,
    duration,
    seek,
  } = usePlayerContext();

  return (
    <div className="flex w-full items-center gap-3">

      <span className="w-10 text-right text-xs text-zinc-500">
        {formatTime(currentTime)}
      </span>

      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={(e) => seek(Number(e.target.value))}
        className="h-1 flex-1 cursor-pointer accent-green-500"
      />

      <span className="w-10 text-xs text-zinc-500">
        {formatTime(duration)}
      </span>

    </div>
  );
}