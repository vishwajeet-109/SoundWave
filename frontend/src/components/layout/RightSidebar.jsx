import { motion } from "framer-motion";
import {
  Clock3,
  ListMusic,
  Music2,
  Volume2,
} from "lucide-react";

import { usePlayerContext } from "@/context/PlayerContext";

const PLACEHOLDER =
  "https://placehold.co/120x120/18181b/ffffff?text=♪";

export default function RightSidebar() {
  const {
    currentSong,
    queue,
    currentIndex,
    isPlaying,
  } = usePlayerContext();

  const upcomingSongs =
    queue.length > 0
      ? queue.slice(currentIndex + 1, currentIndex + 6)
      : [];

  return (
    <aside className="flex h-screen w-[360px] flex-col border-l border-zinc-800 bg-[#111111]">
      {/* Current Song */}

      <div className="border-b border-zinc-800 p-6">
        <div className="mb-5 flex items-center gap-2">
          <Music2
            size={18}
            className="text-green-500"
          />

          <h2 className="font-semibold">
            Now Playing
          </h2>
        </div>

        <motion.div
          whileHover={{ y: -3 }}
          className="overflow-hidden rounded-2xl bg-[#171717]"
        >
          <img
            src={
              currentSong?.coverImage ||
              currentSong?.cover ||
              PLACEHOLDER
            }
            alt={currentSong?.title || "Cover"}
            className="aspect-square w-full object-cover"
          />

          <div className="p-4">
            <h3 className="truncate text-lg font-bold">
              {currentSong?.title ||
                "Nothing Playing"}
            </h3>

            <p className="mt-1 truncate text-sm text-zinc-400">
              {currentSong?.artist?.name ||
                currentSong?.artistName ||
                "Unknown Artist"}
            </p>

            <div className="mt-4 flex items-center gap-2 text-sm text-zinc-500">
              <Volume2 size={15} />

              {isPlaying
                ? "Playing"
                : "Paused"}
            </div>
          </div>
        </motion.div>
      </div>

      {/* Queue */}

      <div className="flex-1 overflow-y-auto p-6">
        <div className="mb-5 flex items-center gap-2">
          <ListMusic
            size={18}
            className="text-blue-400"
          />

          <h2 className="font-semibold">
            Up Next
          </h2>
        </div>

        {upcomingSongs.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-zinc-700 p-8 text-center">
            <Clock3
              size={36}
              className="mx-auto mb-3 text-zinc-600"
            />

            <p className="font-medium">
              Queue Empty
            </p>

            <p className="mt-2 text-sm text-zinc-500">
              Play a playlist or album to
              build your queue.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {upcomingSongs.map((song) => (
              <motion.div
                key={song._id}
                whileHover={{ x: 4 }}
                className="flex cursor-pointer items-center gap-3 rounded-xl bg-[#171717] p-3 transition hover:bg-zinc-800"
              >
                <img
                  src={
                    song.coverImage ||
                    song.cover ||
                    PLACEHOLDER
                  }
                  alt={song.title}
                  className="h-14 w-14 rounded-lg object-cover"
                />

                <div className="min-w-0 flex-1">
                  <h4 className="truncate font-medium">
                    {song.title}
                  </h4>

                  <p className="truncate text-sm text-zinc-400">
                    {song.artist?.name ||
                      song.artistName ||
                      "Unknown Artist"}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </aside>
  );
}