import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Card } from "@/shared/ui";

const PLACEHOLDER =
  "https://placehold.co/500x500/18181b/ffffff?text=Playlist";

export default function PlaylistCard({
  playlist = {},
  onPlay,
}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (playlist?._id) {
      navigate(`/playlists/${playlist._id}`);
    }
  };

  const handlePlay = (event) => {
    event.stopPropagation();
    onPlay?.(playlist);
  };

  const cover =
    playlist.coverImage ||
    playlist.cover ||
    PLACEHOLDER;

  const title =
    playlist.title ||
    playlist.name ||
    "Untitled Playlist";

  const description =
    playlist.description ||
    "No description available.";

  return (
    <motion.div
      whileHover={{ y: -8 }}
      transition={{ duration: 0.25 }}
      onClick={handleNavigate}
      className="cursor-pointer"
    >
      <Card
        variant="interactive"
        className="group"
      >
        <div className="relative">
          <img
            src={cover}
            alt={title}
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER;
            }}
            className="aspect-square w-full rounded-xl object-cover transition duration-500 group-hover:scale-105"
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
              translate-y-3
              items-center
              justify-center
              rounded-full
              bg-primary
              text-black
              opacity-0
              transition-all
              group-hover:translate-y-0
              group-hover:opacity-100
            "
          >
            <Play
              size={20}
              fill="currentColor"
            />
          </button>
        </div>

        <h3 className="mt-4 line-clamp-1 font-semibold text-white">
          {title}
        </h3>

        <p className="mt-1 line-clamp-2 text-sm text-zinc-400">
          {description}
        </p>
      </Card>
    </motion.div>
  );
}