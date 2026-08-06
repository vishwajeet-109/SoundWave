import PlayerControls from "./PlayerControls";
import ProgressBar from "./ProgressBar";
import VolumeControl from "./VolumeControl";

import { usePlayerContext } from "@/context/PlayerContext";

export default function MusicPlayer() {
  const { currentSong } = usePlayerContext();

  if (!currentSong) {
    return null;
  }

  return (
    <footer className="sticky bottom-0 z-50 flex h-24 items-center justify-between border-t border-zinc-800 bg-zinc-950/95 px-6 backdrop-blur-xl">

      {/* Left */}

      <div className="flex w-72 items-center gap-4">

        <img
          src={
            currentSong.coverImage ||
            "/images/default-cover.png"
          }
          alt={currentSong.title}
          className="h-14 w-14 rounded-xl object-cover"
        />

        <div className="min-w-0">

          <h3 className="truncate font-semibold">

            {currentSong.title}

          </h3>

          <p className="truncate text-sm text-zinc-500">

            {currentSong.artist?.name ||
              currentSong.artistName ||
              "Unknown Artist"}

          </p>

        </div>

      </div>

      {/* Center */}

      <div className="flex w-full max-w-xl flex-col items-center">

        <PlayerControls />

        <ProgressBar />

      </div>

      {/* Right */}

      <div className="flex w-72 justify-end">

        <VolumeControl />

      </div>

    </footer>
  );
}