import {
  Play,
  Heart,
  Disc3,
  Music2,
  Headphones,
} from "lucide-react";

import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

import Button from "@/shared/ui/button";
import { usePlayerContext } from "@/context/PlayerContext";

const PLACEHOLDER =
  "https://placehold.co/800x800/171717/ffffff?text=SoundWave";

// 🚀 Added `playlist` (or `songs`) prop to receive the queue list
export default function HeroSection({ featured, playlist = [] }) {
  const navigate = useNavigate();

  const { playSong } = usePlayerContext();

  const albumId =
    featured?.album?._id ||
    featured?.albumId ||
    featured?.album_id;

  if (!featured) return null;
  
  const cover =
    featured.coverImage ||
    featured.cover ||
    PLACEHOLDER;

  const artist =
    featured.artist?.name ||
    featured.artistName ||
    "Unknown Artist";

  const handleNavigate = () => {
    if (albumId) {
      navigate(`/albums/${albumId}`);
    }
  };

  const handlePlay = (e) => {
    e.stopPropagation();
    // 🚀 Pass featured song along with the playlist queue (fallback to [featured])
    const queueList = Array.isArray(playlist) && playlist.length > 0 ? playlist : [featured];
    playSong(featured, queueList);
  };

  const handleSave = (e) => {
    e.stopPropagation();
    // TODO: Like API
  };

  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 40,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.6,
      }}
      onClick={handleNavigate}
      className="
        group
        relative
        overflow-hidden
        rounded-[32px]
        border
        border-zinc-800
        bg-[#111111]
        cursor-pointer
        shadow-2xl
      "
    >
      {/* Background */}
      <div className="absolute inset-0">
        <img
          src={cover}
          alt={featured.title}
          className="
            h-full
            w-full
            object-cover
            opacity-20
            blur-3xl
            scale-110
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#080808]
            via-[#080808]/70
            to-transparent
          "
        />

        <div
          className="
            absolute
            -top-32
            -right-24
            h-80
            w-80
            rounded-full
            bg-green-500/20
            blur-[140px]
          "
        />

        <div
          className="
            absolute
            -bottom-20
            left-20
            h-72
            w-72
            rounded-full
            bg-blue-500/10
            blur-[120px]
          "
        />
      </div>

      {/* Content */}
      <div
        className="
          relative
          z-10
          grid
          gap-14
          p-10
          lg:grid-cols-[1.2fr_0.8fr]
        "
      >
        {/* LEFT */}
        <div
          className="
            flex
            flex-col
            justify-center
          "
        >
          <div
            className="
              mb-5
              flex
              items-center
              gap-2
            "
          >
            <Disc3
              size={18}
              className="text-green-500"
            />

            <span
              className="
                text-xs
                uppercase
                tracking-[5px]
                text-green-400
                font-semibold
              "
            >
              Featured Release
            </span>
          </div>

          <h1
            className="
              max-w-2xl
              text-5xl
              font-black
              leading-tight
              text-white
              lg:text-6xl
            "
          >
            {featured.title}
          </h1>

          <p
            className="
              mt-6
              max-w-xl
              text-lg
              leading-8
              text-zinc-300
            "
          >
            {featured.description ||
              "Experience premium quality music with immersive sound, curated playlists and millions of tracks."}
          </p>

          <div
            className="
              mt-8
              flex
              items-center
              gap-3
            "
          >
            <Headphones
              size={18}
              className="text-green-500"
            />

            <span className="text-zinc-300">
              {artist}
            </span>
          </div>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Button
              size="lg"
              onClick={handlePlay}
              leftIcon={
                <Play
                  size={18}
                  fill="currentColor"
                />
              }
              className="
                min-w-[170px]
                rounded-full
                bg-[#22C55E]
                font-semibold
                text-black
                transition-all
                duration-300
                hover:scale-105
                hover:bg-green-400
              "
            >
              Play Now
            </Button>

            <Button
              variant="secondary"
              size="lg"
              onClick={handleSave}
              leftIcon={<Heart size={18} />}
              className="
                rounded-full
                border
                border-zinc-700
                bg-white/5
                backdrop-blur-xl
                transition-all
                duration-300
                hover:border-green-500
              "
            >
              Save
            </Button>
          </div>

          {/* Stats */}
          <div className="mt-12 flex flex-wrap gap-8">
            <div>
              <p className="text-3xl font-black text-white">
                50M+
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Monthly Streams
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-white">
                HD
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Lossless Audio
              </p>
            </div>

            <div>
              <p className="text-3xl font-black text-white">
                AI
              </p>
              <p className="mt-1 text-sm text-zinc-400">
                Recommendations
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="flex items-center justify-center">
          <motion.div
            whileHover={{
              y: -12,
              rotate: -2,
            }}
            transition={{
              duration: 0.35,
            }}
            className="relative"
          >
            <div
              className="
                absolute
                -inset-5
                rounded-[40px]
                bg-green-500/20
                blur-3xl
              "
            />

            <img
              src={cover}
              alt={featured.title}
              className="
                relative
                w-full
                max-w-[380px]
                rounded-[32px]
                border
                border-zinc-700
                shadow-[0_25px_80px_rgba(0,0,0,.45)]
              "
            />

            {/* Floating Glass Card */}
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
                delay: 0.3,
              }}
              className="
                absolute
                -left-10
                bottom-8
                hidden
                rounded-2xl
                border
                border-white/10
                bg-white/10
                px-5
                py-4
                backdrop-blur-2xl
                lg:block
              "
            >
              <div className="flex items-center gap-3">
                <div
                  className="
                    flex
                    h-12
                    w-12
                    items-center
                    justify-center
                    rounded-full
                    bg-[#22C55E]
                  "
                >
                  <Music2
                    size={22}
                    className="text-black"
                  />
                </div>

                <div>
                  <p className="text-xs uppercase tracking-widest text-zinc-400">
                    Artist
                  </p>
                  <h4 className="font-semibold text-white">
                    {artist}
                  </h4>
                </div>
              </div>
            </motion.div>

            {/* Floating Premium Badge */}
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                repeat: Infinity,
                duration: 4,
              }}
              className="
                absolute
                -right-5
                top-6
                hidden
                rounded-full
                border
                border-green-500/30
                bg-[#111111]
                px-5
                py-3
                shadow-xl
                lg:block
              "
            >
              <span className="font-semibold text-green-400">
                Premium Audio
              </span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  );
}