import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Card } from "@/shared/ui";

const PLACEHOLDER =
  "https://placehold.co/500x500/18181b/ffffff?text=Artist";

export default function ArtistCard({
  artist = {},
  onPlay,
}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    if (artist?._id) {
      navigate(`/artists/${artist._id}`);
    }
  };

  const handlePlay = (event) => {
    event.stopPropagation();
    onPlay?.(artist);
  };

  const image =
    artist.image ||
    artist.avatar ||
    artist.profileImage ||
    PLACEHOLDER;

  const name =
    artist.name ||
    artist.artistName ||
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
        className="group text-center"
      >
        <div className="relative">
          <img
            src={image}
            alt={name}
            onError={(e) => {
              e.currentTarget.src = PLACEHOLDER;
            }}
            className="aspect-square w-full rounded-full object-cover transition duration-500 group-hover:scale-105"
          />

          <button
            type="button"
            onClick={handlePlay}
            className="
              absolute
              bottom-3
              right-3
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
            >
              <Play
                size={20}
                fill="currentColor"
              />
          </button>
        </div>

        <h3 className="mt-4 line-clamp-1 font-semibold text-white">
          {name}
        </h3>

        <p className="mt-1 text-sm text-zinc-400">
          Artist
        </p>
      </Card>
    </motion.div>
  );
}