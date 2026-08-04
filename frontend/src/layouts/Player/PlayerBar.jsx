import {
  Heart,
  Pause,
  SkipBack,
  SkipForward,
  Shuffle,
  Repeat2,
} from "lucide-react";

import ProgressBar from "./ProgressBar";
import VolumeSlider from "./VolumeSlider";

export default function PlayerBar() {
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

          <div className="h-14 w-14 rounded-xl bg-zinc-800" />

          <div>
            <h4 className="font-medium">
              Blinding Lights
            </h4>

            <p className="text-sm text-zinc-500">
              The Weeknd
            </p>
          </div>

          <Heart
            size={18}
            className="ml-3 cursor-pointer text-zinc-500 hover:text-primary"
          />

        </div>

        {/* Controls */}

        <div className="flex flex-col items-center gap-3">

          <div className="flex items-center gap-5">

            <Shuffle
              size={18}
              className="cursor-pointer text-zinc-500 hover:text-white"
            />

            <SkipBack
              size={20}
              className="cursor-pointer hover:text-primary"
            />

            <button
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
              "
            >
              <Pause size={20} />
            </button>

            <SkipForward
              size={20}
              className="cursor-pointer hover:text-primary"
            />

            <Repeat2
              size={18}
              className="cursor-pointer text-zinc-500 hover:text-white"
            />

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