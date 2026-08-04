import {
  Volume2,
  VolumeX,
} from "lucide-react";

import { usePlayer } from "@/context/usePlayer";

export default function VolumeSlider() {

  const {
    volume,
    isMuted,
    changeVolume,
    toggleMute,
  } = usePlayer();

  const handleVolume = (event) => {
    changeVolume(event.target.value);
  };

  return (
    <div className="flex items-center gap-3">

      <button
        type="button"
        onClick={toggleMute}
        className="text-zinc-400 transition hover:text-white"
      >
        {isMuted ? (
          <VolumeX size={18} />
        ) : (
          <Volume2 size={18} />
        )}
      </button>

      <input
        type="range"
        min={0}
        max={1}
        step={0.01}
        value={volume}
        onChange={handleVolume}
        className="w-28 accent-primary"
      />

    </div>
  );
}