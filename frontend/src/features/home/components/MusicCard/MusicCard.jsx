import { memo } from "react";

import { Heart, MoreHorizontal, Play, Music2 } from "lucide-react";
import { motion } from "framer-motion";

import Card from "@/shared/ui/card";
import { useMusicCard } from "../../hooks/useMusicCard";

const PLACEHOLDER =
  "https://placehold.co/600x600/171717/ffffff?text=♪";

function MusicCard({ song, onPlay, playlist = [] }) {
  const {
    cover,
    artist,
    duration,
    genre,
    handleNavigate,
    handlePlay,
    handleLike,
    handleMenu,
  } = useMusicCard({
    song,
    playlist,
    onPlay,
  });

  if (!song) return null;

  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="cursor-pointer"
      onClick={handleNavigate}
    >
      <Card
        padding="none"
        variant="interactive"
        className="group relative overflow-hidden rounded-[26px] border border-zinc-800 bg-[#171717] transition-all duration-300 hover:border-green-500/30 hover:shadow-[0_20px_60px_rgba(34,197,94,.15)]"
      >
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-500/10 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />

        <div className="relative">
          <img
            src={cover}
            alt={song.title}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = PLACEHOLDER;
            }}
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

          <div className="absolute left-4 right-4 top-4 flex justify-between opacity-0 transition-all duration-300 group-hover:opacity-100">
            <button
              type="button"
              onClick={handleLike}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xl"
            >
              <Heart size={18} />
            </button>

            <button
              type="button"
              onClick={handleMenu}
              className="flex h-10 w-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-xl"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>

          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={handlePlay}
            className="absolute bottom-5 right-5 flex h-14 w-14 translate-y-5 items-center justify-center rounded-full bg-[#22C55E] text-black opacity-0 shadow-2xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Play size={22} fill="currentColor" />
          </motion.button>
        </div>

        <div className="space-y-3 p-5">
          <h3 className="line-clamp-1 text-lg font-bold text-white">{song.title}</h3>

          <p className="line-clamp-1 text-sm text-zinc-400">{artist}</p>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Music2 size={15} className="text-green-500" />

              <span className="text-xs text-zinc-500">{duration}</span>
            </div>

            <span className="rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-medium text-green-400">
              {genre}
            </span>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export default memo(MusicCard);