import {
  Play,
  Music2,
  Disc3,
} from "lucide-react";

import { motion } from "framer-motion";

const PLACEHOLDER =
  "https://placehold.co/300x300/18181b/ffffff?text=♪";

export default function QuickAccess({
  songs = [],
  onPlay,
}) {
  if (!songs.length) {
    return (
      <section className="mb-14">
        <div
          className="
            flex
            h-44
            items-center
            justify-center
            rounded-[28px]
            border
            border-zinc-800
            bg-[#111111]
          "
        >
          <div className="text-center">

            <Music2
              size={42}
              className="mx-auto mb-3 text-zinc-600"
            />

            <p className="text-zinc-400">
              Nothing available yet
            </p>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="mb-14">

      <div className="mb-8 flex items-center justify-between">

        <div>

          <h2 className="text-3xl font-bold text-white">
            Quick Access
          </h2>

          <p className="mt-1 text-zinc-400">
            Jump back into your favourite music.
          </p>

        </div>

        <Disc3
          size={24}
          className="text-green-500"
        />

      </div>

      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {songs.slice(0, 8).map((song, index) => {
  const cover =
    song.coverImage ||
    song.cover ||
    PLACEHOLDER;

  const artist =
    song.artist?.name ||
    song.artistName ||
    "Unknown Artist";

  return (
    <motion.button
      key={song._id}
      type="button"
      onClick={() => onPlay?.(song)}
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        delay: index * 0.05,
      }}
      whileHover={{
        y: -6,
      }}
      className="
        group
        relative
        overflow-hidden
        rounded-[24px]
        border
        border-zinc-800
        bg-[#171717]
        text-left
        transition-all
        duration-300
        hover:border-green-500/40
        hover:shadow-[0_20px_40px_rgba(34,197,94,.15)]
      "
    >
      {/* Background Glow */}

      <div
        className="
          absolute
          inset-0
          opacity-0
          transition
          duration-500
          group-hover:opacity-100
        "
      >
        <div
          className="
            absolute
            -right-10
            -top-10
            h-40
            w-40
            rounded-full
            bg-green-500/10
            blur-3xl
          "
        />
      </div>

      {/* Cover */}

      <div className="relative overflow-hidden">

        <img
          src={cover}
          alt={song.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = PLACEHOLDER;
          }}
          className="
            h-44
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-110
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-t
            from-black
            via-black/10
            to-transparent
          "
        />

                {/* Floating Play Button */}

        <motion.div
          initial={{
            scale: 0.8,
            opacity: 0,
          }}
          whileHover={{
            scale: 1,
          }}
          className="
            absolute
            bottom-4
            right-4
            opacity-0
            transition-all
            duration-300
            group-hover:opacity-100
          "
        >
          <div
            className="
              flex
              h-14
              w-14
              items-center
              justify-center
              rounded-full
              bg-[#22C55E]
              text-black
              shadow-[0_12px_35px_rgba(34,197,94,.45)]
            "
          >
            <Play
              size={20}
              fill="currentColor"
            />
          </div>
        </motion.div>

      </div>

      {/* Content */}

      <div className="p-5">

        <h3
          className="
            truncate
            text-lg
            font-bold
            text-white
          "
        >
          {song.title}
        </h3>

        <p
          className="
            mt-1
            truncate
            text-sm
            text-zinc-400
          "
        >
          {artist}
        </p>

        <div
          className="
            mt-5
            flex
            items-center
            justify-between
          "
        >
          <span
            className="
              rounded-full
              border
              border-zinc-700
              bg-zinc-900
              px-3
              py-1
              text-xs
              text-zinc-400
            "
          >
            Featured
          </span>

          <span
            className="
              text-xs
              font-medium
              text-green-400
            "
          >
            Play Now
          </span>
        </div>

      </div>

    </motion.button>
  );
})}
      </div>

    </section>
  );
}