import { memo } from "react";
import { Play, Disc3, Calendar } from "lucide-react";
import { motion } from "framer-motion";

import Card from "@/shared/ui/card";
import { useAlbumCard } from "../../hooks/useAlbumCard";

const PLACEHOLDER =
  "https://placehold.co/600x600/171717/ffffff?text=Album";

function AlbumCard({ album }) {
  const { cover, artist, songs, year, handleNavigate, handlePlay } = useAlbumCard({ album });

  if (!album) return null;

  return (
    <motion.article
      layout
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      onClick={handleNavigate}
      className="cursor-pointer min-w-0 w-full" // 🚀 Added min-w-0 to prevent grid stretching
    >
      <Card 
        padding="none" 
        variant="interactive" 
        className="group relative overflow-hidden rounded-[26px] border border-zinc-800 bg-[#171717] transition-all duration-300 hover:border-green-500/30 hover:shadow-[0_20px_60px_rgba(34,197,94,.15)] h-full flex flex-col"
      >
        <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-green-500/10 opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-100" />

        <div className="relative">
          <img
            src={cover}
            alt={album.title}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = PLACEHOLDER;
            }}
            className="aspect-square w-full object-cover transition-transform duration-700 group-hover:scale-110"
          />

          <div className="absolute inset-0 bg-linear-to-t from-black via-black/20 to-transparent" />

          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={handlePlay}
            className="absolute bottom-5 right-5 flex h-14 w-14 translate-y-5 items-center justify-center rounded-full bg-[#22C55E] text-black opacity-0 shadow-2xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Play size={22} fill="currentColor" />
          </motion.button>
        </div>

        <div className="space-y-3 p-5 flex-1 flex flex-col justify-between min-w-0">
          <div className="min-w-0">
            {/* 🚀 Added truncate and min-w-0 to stop text from breaking card width */}
            <h3 className="truncate text-lg font-bold text-white">{album.title}</h3>
            <p className="truncate text-sm text-zinc-400 mt-0.5">{artist}</p>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="flex items-center gap-2">
              <Disc3 size={15} className="text-green-500 shrink-0" />
              <span className="text-xs text-zinc-500 truncate">{songs.length} Songs</span>
            </div>

            {year && (
              <div className="flex items-center gap-1 text-xs text-zinc-500 shrink-0">
                <Calendar size={14} />
                <span>{year}</span>
              </div>
            )}
          </div>

          <div>
            <span className="inline-block rounded-full border border-zinc-700 bg-zinc-900 px-3 py-1 text-xs font-medium text-green-400">
              Album
            </span>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export default memo(AlbumCard);