import { memo, useCallback, useMemo } from "react";

import {
  Play,
  Disc3,
  Calendar,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Card } from "@/shared/ui";
import { usePlayerContext } from "@/context/PlayerContext";

const PLACEHOLDER =
  "https://placehold.co/600x600/171717/ffffff?text=Album";

function AlbumCard({
  album,
}) {
  const navigate = useNavigate();

  const { playSong } =
    usePlayerContext();

  if (!album) return null;

  const cover = useMemo(
    () =>
      album.coverImage ||
      album.cover ||
      PLACEHOLDER,
    [album]
  );

  const artist = useMemo(
    () =>
      album.artist?.name ||
      album.artistName ||
      "Unknown Artist",
    [album]
  );

  const year = useMemo(() => {
    if (!album.releaseDate) return null;

    return new Date(
      album.releaseDate
    ).getFullYear();
  }, [album]);

  const songs =
    album.songs || [];

  const handleNavigate =
    useCallback(() => {
      navigate(
        `/albums/${album._id}`
      );
    }, [album, navigate]);

  const handlePlay =
    useCallback(
      (e) => {
        e.stopPropagation();

        if (!songs.length) return;

        playSong(
          songs[0],
          songs
        );
      },
      [songs, playSong]
    );

  return (
    <motion.article
      whileHover={{
        y: -8,
      }}
      transition={{
        duration: 0.25,
      }}
      onClick={handleNavigate}
      className="cursor-pointer"
    >
      <Card
        padding="none"
        variant="interactive"
        className="
          group
          overflow-hidden
          rounded-[28px]
        "
      >
        <div className="relative">

          <img
            src={cover}
            alt={album.title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror =
                null;

              e.currentTarget.src =
                PLACEHOLDER;
            }}
            className="
              aspect-square
              w-full
              object-cover
              transition-transform
              duration-700
              group-hover:scale-105
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

          <motion.button
            whileTap={{
              scale: 0.92,
            }}
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
          </motion.button>

        </div>

        <div className="space-y-3 p-5">

          <h3
            className="
              line-clamp-1
              text-lg
              font-bold
              text-white
            "
          >
            {album.title}
          </h3>

          <p
            className="
              line-clamp-1
              text-sm
              text-zinc-400
            "
          >
            {artist}
          </p>
                    <div className="flex items-center justify-between pt-2">

            <div className="flex items-center gap-2">

              <Disc3
                size={15}
                className="text-green-500"
              />

              <span
                className="
                  text-xs
                  text-zinc-500
                "
              >
                {songs.length} Songs
              </span>

            </div>

            {year && (
              <div
                className="
                  flex
                  items-center
                  gap-1
                  text-xs
                  text-zinc-500
                "
              >
                <Calendar size={14} />

                <span>{year}</span>
              </div>
            )}

          </div>

          <div className="pt-1">

            <span
              className="
                inline-flex
                rounded-full
                border
                border-green-500/20
                bg-green-500/10
                px-3
                py-1
                text-xs
                font-medium
                text-green-400
              "
            >
              Album
            </span>

          </div>

        </div>

      </Card>

    </motion.article>
  );
}

export default memo(AlbumCard);