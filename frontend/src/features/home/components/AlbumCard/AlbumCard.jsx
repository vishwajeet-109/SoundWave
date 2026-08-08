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
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      onClick={handleNavigate}
      className="cursor-pointer h-full"
    >
      <Card padding="none" variant="interactive" className="group overflow-hidden rounded-[28px] h-full">
        <div className="relative h-44 overflow-hidden">
          <img
            src={cover}
            alt={album.title}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = PLACEHOLDER;
            }}
            className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
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

        <div className="flex flex-1 flex-col justify-between space-y-3 p-5">
          <div>
            <h3 className="line-clamp-1 text-lg font-bold text-white">{album.title}</h3>

            <p className="line-clamp-1 text-sm text-zinc-400">{artist}</p>
          </div>

          <div className="flex items-center justify-between pt-2 text-xs text-zinc-500">
            <div className="flex items-center gap-2">
              <Disc3 size={15} className="text-green-500" />
              <span>{songs.length} Songs</span>
            </div>

            {year && (
              <div className="flex items-center gap-1">
                <Calendar size={14} />
                <span>{year}</span>
              </div>
            )}
          </div>

          <div>
            <span className="inline-flex rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
              Album
            </span>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export default memo(AlbumCard);