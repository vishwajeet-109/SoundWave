import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Card } from "@/shared/ui";

const PLACEHOLDER =
  "https://placehold.co/500x500/18181b/ffffff?text=No+Cover";

export default function MusicCard({
  song = {},
  onPlay,
}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (song?._id) {
      navigate(`/albums/${song._id}`);
    }
  };

  const handlePlay = (event) => {
    event.stopPropagation();
    onPlay?.(song);
  };

  const cover =
    song.coverImage ||
    song.cover ||
    PLACEHOLDER;

  const artist =
    song.artist?.name ||
    song.artistName ||
    "Unknown Artist";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      onClick={handleNavigate}
      className="cursor-pointer"
    >
      <Card
        variant="interactive"
        className="group overflow-hidden"
      >
        <div className="relative">
          <img
            src={cover}
            alt={song.title || "Cover"}
            onError={(e) => {
              e.target.src = PLACEHOLDER;
            }}
            className="aspect-square w-full object-cover transition duration-500 group-hover:scale-105"
          />

          <button
            type="button"
            onClick={handlePlay}
            className="
              absolute
              bottom-4
              right-4
              flex
              h-12
              w-12
              translate-y-4
              items-center
              justify-center
              rounded-full
              bg-primary
              text-black
              opacity-0
              shadow-xl
              transition-all
              duration-300
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            <Play
              size={22}
              fill="currentColor"
            />
          </button>
        </div>

        <div className="mt-4">
          <h3 className="line-clamp-1 font-semibold text-white">
            {song.title || "Untitled"}
          </h3>

          <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
            {artist}
          </p>
        </div>
      </Card>
    </motion.div>
  );
}