import { memo } from "react";

import { Play, ListMusic, User } from "lucide-react";
import { motion } from "framer-motion";

import { Card } from "@/shared/ui/card";
import { usePlaylistCard } from "../../hooks/usePlaylistCard";

const PLACEHOLDER =
  "https://placehold.co/600x600/171717/ffffff?text=Playlist";

function PlaylistCard({ playlist }) {
  const { cover, title, owner, songs, handleNavigate, handlePlay } = usePlaylistCard({ playlist });

  if (!playlist) return null;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      className="cursor-pointer"
      onClick={handleNavigate}
    >
      <Card padding="none" variant="interactive" className="group overflow-hidden rounded-[28px] bg-[#171717]">
        <div className="relative">
          <img
            src={cover}
            alt={title}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = PLACEHOLDER;
            }}
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-105"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={handlePlay}
            className="absolute bottom-5 right-5 flex h-14 w-14 translate-y-5 items-center justify-center rounded-full bg-[#22C55E] text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Play size={22} fill="currentColor" />
          </motion.button>
        </div>

        <div className="space-y-3 p-5">
          <h3 className="line-clamp-1 text-lg font-bold text-white">{title}</h3>

          <div className="flex items-center gap-2 text-sm text-zinc-400">
            <User size={15} />

            <span className="line-clamp-1">{owner}</span>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <ListMusic size={15} className="text-green-500" />

              <span className="text-xs text-zinc-500">{songs.length} Songs</span>
            </div>

            <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
              Playlist
            </span>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export default memo(PlaylistCard);