import { memo } from "react";

import { Play, BadgeCheck, Users } from "lucide-react";
import { motion } from "framer-motion";

import { Card } from "@/shared/ui/card";
import { useArtistCard } from "../../hooks/useArtistCard";

const PLACEHOLDER =
  "https://placehold.co/500x500/18181b/ffffff?text=Artist";

function ArtistCard({ artist, onPlay }) {
  const { image, artistName, monthlyListeners, followers, handleNavigate, handlePlay } = useArtistCard({ artist, onPlay });

  if (!artist) return null;

  return (
    <motion.article
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      onClick={handleNavigate}
      className="cursor-pointer"
    >
      <Card padding="none" variant="interactive" className="group overflow-hidden rounded-[28px] bg-[#171717]">
        <div className="relative flex justify-center pt-8">
          <div className="absolute h-40 w-40 rounded-full bg-green-500/10 blur-3xl opacity-0 transition duration-500 group-hover:opacity-100" />

          <img
            src={image}
            alt={artistName}
            loading="lazy"
            onError={(event) => {
              event.currentTarget.onerror = null;
              event.currentTarget.src = PLACEHOLDER;
            }}
            className="relative h-40 w-40 rounded-full object-cover ring-4 ring-zinc-800 transition-transform duration-700 group-hover:scale-105"
          />

          <motion.button
            whileTap={{ scale: 0.92 }}
            type="button"
            onClick={handlePlay}
            className="absolute bottom-2 right-10 flex h-14 w-14 translate-y-5 items-center justify-center rounded-full bg-[#22C55E] text-black opacity-0 shadow-xl transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100"
          >
            <Play size={22} fill="currentColor" />
          </motion.button>
        </div>

        <div className="space-y-3 p-6">
          <div className="flex items-center justify-center gap-2">
            <h3 className="line-clamp-1 text-center text-xl font-bold text-white">{artistName}</h3>

            {artist.verified && <BadgeCheck size={18} className="text-sky-500" />}
          </div>

          {monthlyListeners && (
            <div className="flex items-center justify-center gap-2 text-sm text-zinc-400">
              <Users size={16} className="text-green-500" />

              <span>{monthlyListeners.toLocaleString()} Monthly Listeners</span>
            </div>
          )}

          {followers && (
            <p className="text-center text-xs text-zinc-500">{followers.toLocaleString()} Followers</p>
          )}

          <div className="flex justify-center">
            <span className="rounded-full border border-green-500/20 bg-green-500/10 px-3 py-1 text-xs font-medium text-green-400">
              Artist
            </span>
          </div>
        </div>
      </Card>
    </motion.article>
  );
}

export default memo(ArtistCard);