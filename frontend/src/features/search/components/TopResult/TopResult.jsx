import { useMemo } from "react";
import { Play } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Card } from "@/shared/ui";
import { usePlayerContext } from "@/context/PlayerContext";

const PLACEHOLDER =
  "https://placehold.co/600x600/18181b/ffffff?text=♪";

export default function TopResult({
  results = {},
}) {
  const navigate = useNavigate();

  const { playSong } =
    usePlayerContext();

  const item = useMemo(() => {
    if (results?.songs?.length)
      return {
        ...results.songs[0],
        type: "Song",
      };

    if (results?.albums?.length)
      return {
        ...results.albums[0],
        type: "Album",
      };

    if (results?.artists?.length)
      return {
        ...results.artists[0],
        type: "Artist",
      };

    if (results?.playlists?.length)
      return {
        ...results.playlists[0],
        type: "Playlist",
      };

    return null;
  }, [results]);

  if (!item) return null;

  const cover =
    item.coverImage ||
    item.cover ||
    item.image ||
    item.avatar ||
    PLACEHOLDER;

  const title =
    item.title ||
    item.name ||
    "Unknown";

  const subtitle =
    item.artist?.name ||
    item.artistName ||
    item.owner?.name ||
    "";

  const handlePlay = (e) => {
    e.stopPropagation();

    if (item.type === "Song") {
      playSong(item, results.songs);
    }
  };

  const handleNavigate = () => {
    switch (item.type) {
      case "Song":
      case "Album":
        navigate(
          `/albums/${
            item.album?._id ||
            item.albumId ||
            item._id
          }`
        );
        break;

      case "Artist":
        navigate(`/artists/${item._id}`);
        break;

      case "Playlist":
        navigate(`/playlists/${item._id}`);
        break;

      default:
        break;
    }
  };

  return (
    <motion.div
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.3,
      }}
      onClick={handleNavigate}
      className="cursor-pointer"
    >
      <Card
        variant="interactive"
        padding="none"
        className="
          group
          overflow-hidden
          rounded-3xl
        "
      >

        <div className="relative">

          <img
            src={cover}
            alt={title}
            className="
              aspect-square
              w-full
              object-cover
            "
          />

          <div
            className="
              absolute
              inset-0
              bg-gradient-to-t
              from-black
              via-black/20
              to-transparent
            "
          />
                    <button
            type="button"
            onClick={handlePlay}
            className="
              absolute
              bottom-5
              right-5
              flex
              h-14
              w-14
              translate-y-5
              items-center
              justify-center
              rounded-full
              bg-[#22C55E]
              text-black
              opacity-0
              shadow-[0_15px_35px_rgba(34,197,94,.45)]
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

        <div className="space-y-4 p-6">

          <span
            className="
              inline-flex
              rounded-full
              bg-green-500/10
              px-3
              py-1
              text-xs
              font-semibold
              uppercase
              tracking-wide
              text-green-400
            "
          >
            {item.type}
          </span>

          <div>

            <h2
              className="
                line-clamp-1
                text-3xl
                font-black
                text-white
              "
            >
              {title}
            </h2>

            {subtitle && (
              <p
                className="
                  mt-2
                  line-clamp-2
                  text-sm
                  text-zinc-400
                "
              >
                {subtitle}
              </p>
            )}

          </div>

          <div
            className="
              flex
              items-center
              gap-2
              text-xs
              text-zinc-500
            "
          >
            <span>Top Result</span>

            <span>•</span>

            <span>{item.type}</span>

          </div>

        </div>

      </Card>

    </motion.div>
  );
}