import {
  Volume2,
  VolumeX,
} from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";

export default function VolumeControl() {
  const {
    volume,
    isMuted,

    changeVolume,
    toggleMute,
  } = usePlayerContext();

  return (
    <div className="flex items-center gap-3">

      <button
        onClick={toggleMute}
        className="text-zinc-400 transition hover:text-white"
      >
        {isMuted ? (
          <VolumeX size={20} />
        ) : (
          <Volume2 size={20} />
        )}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={isMuted ? 0 : volume}
        onChange={(e) =>
          changeVolume(Number(e.target.value))
        }
        className="w-28 cursor-pointer accent-green-500"
      />

    </div>
  );
}