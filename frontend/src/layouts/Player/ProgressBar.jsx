import { usePlayer } from "@/context/usePlayer";

function formatTime(time) {
  if (!time || Number.isNaN(time)) {
    return "0:00";
  }

  const minutes = Math.floor(time / 60);
  const seconds = Math.floor(time % 60);

  return `${minutes}:${seconds.toString().padStart(2, "0")}`;
}

export default function ProgressBar() {
  const {
    currentTime,
    duration,
    seek,
  } = usePlayer();

  const progress =
    duration > 0
      ? (currentTime / duration) * 100
      : 0;

  const handleSeek = (event) => {
    seek(Number(event.target.value));
  };

  return (
    <div className="flex w-full items-center gap-3">

      <span className="w-10 text-xs text-zinc-500">
        {formatTime(currentTime)}
      </span>

      <input
        type="range"
        min={0}
        max={duration || 0}
        value={currentTime}
        onChange={handleSeek}
        className="flex-1 accent-primary"
      />

      <span className="w-10 text-xs text-zinc-500">
        {formatTime(duration)}
      </span>

    </div>
  );
}