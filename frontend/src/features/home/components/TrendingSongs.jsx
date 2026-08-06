import { Flame } from "lucide-react";
import { motion } from "framer-motion";

import SectionHeader from "./SectionHeader/SectionHeader";
import MusicCard, {
  MusicCardSkeleton,
} from "./MusicCard";
export default function TrendingSongs({
  songs = [],
  loading = false,
  onPlay,
}) {
  return (
    <section className="mt-14">

      <SectionHeader
        title="Trending Songs"
        subtitle="Most played tracks today"
        icon={<Flame size={20} />}
        href="/songs"
      />

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

          {Array.from({ length: 10 }).map((_, index) => (
            <MusicCardSkeleton key={index} />
          ))}

        </div>
      ) : songs.length > 0 ? (
        <motion.div
          initial={{
            opacity: 0,
          }}
          animate={{
            opacity: 1,
          }}
          transition={{
            duration: 0.35,
          }}
          className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5"
        >

          {songs.slice(0, 10).map((song) => {
            return (
              <MusicCard
                key={song._id}
                song={song}
                playlist={songs}
                onPlay={onPlay}
              />
            );
          })}

        </motion.div>
      ) : (
        <div className="flex h-48 items-center justify-center rounded-3xl border border-zinc-800 bg-[#111111]">

          <div className="text-center">

            <Flame
              size={42}
              className="mx-auto mb-4 text-zinc-600"
            />

            <h3 className="text-lg font-semibold text-white">
              No Trending Songs
            </h3>

            <p className="mt-2 text-sm text-zinc-500">
              Songs will appear here once available.
            </p>

          </div>

        </div>
      )}

    </section>
  );
}


