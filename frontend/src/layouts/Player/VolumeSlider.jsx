import { Volume2 } from "lucide-react";

export default function VolumeSlider() {
  return (
    <div className="flex items-center gap-3">

      <Volume2
        size={18}
        className="text-zinc-400"
      />

      <input
        type="range"
        defaultValue={80}
        className="w-28 accent-primary"
      />

    </div>
  );
}