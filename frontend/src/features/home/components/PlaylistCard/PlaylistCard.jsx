import {
  memo,
  useCallback,
  useMemo,
} from "react";

import {
  Play,
  ListMusic,
  User,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import { Card } from "@/shared/ui";
import { usePlayerContext } from "@/context/PlayerContext";

const PLACEHOLDER =
  "https://placehold.co/600x600/171717/ffffff?text=Playlist";

function PlaylistCard({
  playlist,
}) {
  const navigate = useNavigate();

  const { playSong } =
    usePlayerContext();

  if (!playlist) return null;

  const cover = useMemo(
    () =>
      playlist.coverImage ||
      playlist.cover ||
      PLACEHOLDER,
    [playlist]
  );

  const title = useMemo(
    () =>
      playlist.title ||
      playlist.name ||
      "Untitled Playlist",
    [playlist]
  );

  const owner = useMemo(
    () =>
      playlist.owner?.name ||
      playlist.user?.name ||
      playlist.createdBy?.name ||
      "Unknown",
    [playlist]
  );

  const songs =
    playlist.songs || [];

  const handleNavigate =
    useCallback(() => {
      navigate(
        `/playlists/${playlist._id}`
      );
    }, [playlist, navigate]);

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
      className="cursor-pointer"
      onClick={handleNavigate}
    >
      <Card
        padding="none"
        variant="interactive"
        className="
          group
          overflow-hidden
          rounded-[28px]
          bg-[#171717]
        "
      >

        {/* ==========================
            FUTURE
            --------------------------
            Playlist Gradient
            Dynamic Cover
            Smart Mix Badge
            ========================== */}

        <div className="relative">

          <img
            src={cover}
            alt={title}
            loading="lazy"
            onError={(e) => {
              e.currentTarget.onerror = null;
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
            {title}
          </h3>

          <div
            className="
              flex
              items-center
              gap-2
              text-sm
              text-zinc-400
            "
          >
            <User size={15} />

            <span className="line-clamp-1">
              {owner}
            </span>

          </div>
                    <div
            className="
              flex
              items-center
              justify-between
              pt-2
            "
          >

            <div
              className="
                flex
                items-center
                gap-2
              "
            >
              <ListMusic
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

            <span
              className="
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
              Playlist
            </span>

          </div>

          {/* ==========================
              FUTURE FEATURES
              --------------------------
              □ Save Playlist
              □ Follow Playlist
              □ Playlist Duration
              □ Collaborative Playlist
              □ Smart Mix Badge
              □ Context Menu
              □ Download Playlist
              □ Share Playlist
              □ Playlist Analytics
              ========================== */}

        </div>

      </Card>

    </motion.article>
  );
}

export default memo(PlaylistCard);