import {
  Library,
  Heart,
  Disc3,
  ListMusic,
  UserRound,
} from "lucide-react";

import { motion } from "framer-motion";

export default function LibraryHero() {
  return (
    <motion.section
      initial={{
        opacity: 0,
        y: 20,
      }}
      animate={{
        opacity: 1,
        y: 0,
      }}
      transition={{
        duration: 0.4,
      }}
      className="
        relative
        overflow-hidden
        rounded-[36px]
        border
        border-zinc-800
        bg-gradient-to-br
        from-zinc-900
        via-[#171717]
        to-black
        p-8
      "
    >

      {/* ==========================================
          FUTURE
          ------------------------------------------
          □ Dynamic Greeting
          □ User Avatar
          □ Premium Badge
          □ Library Insights
          □ Recently Added Summary
          ========================================== */}

      {/* Background Glow */}

      <div
        className="
          absolute
          -right-20
          -top-20
          h-72
          w-72
          rounded-full
          bg-green-500/10
          blur-[120px]
        "
      />

      <div className="relative">

        {/* Header */}

        <div className="flex items-center gap-5">

          <div
            className="
              flex
              h-20
              w-20
              items-center
              justify-center
              rounded-3xl
              bg-green-500/10
              text-green-500
            "
          >
            <Library size={42} />
          </div>

          <div>

            <p
              className="
                text-sm
                uppercase
                tracking-[0.25em]
                text-green-400
              "
            >
              Collection
            </p>

            <h1
              className="
                mt-2
                text-5xl
                font-black
                text-white
              "
            >
              Your Library
            </h1>

            <p
              className="
                mt-3
                max-w-2xl
                text-zinc-400
              "
            >
              All your favorite songs, albums,
              playlists and artists in one place.
            </p>

          </div>

        </div>

        {/* Stats */}

        <div
          className="
            mt-10
            grid
            gap-5
            sm:grid-cols-2
            lg:grid-cols-4
          "
        >

          <StatCard
            icon={<Heart size={20} />}
            value="Liked"
            label="Songs"
          />

          <StatCard
            icon={<ListMusic size={20} />}
            value="Playlists"
            label="Collections"
          />

          <StatCard
            icon={<Disc3 size={20} />}
            value="Albums"
            label="Saved"
          />

          <StatCard
            icon={<UserRound size={20} />}
            value="Artists"
            label="Following"
          />

        </div>

      </div>

    </motion.section>
  );
}

function StatCard({
  icon,
  value,
  label,
}) {
  return (
    <div
      className="
        rounded-2xl
        border
        border-zinc-800
        bg-zinc-900/60
        p-5
        backdrop-blur-xl
      "
    >
      <div className="text-green-500">
        {icon}
      </div>

      <h3
        className="
          mt-4
          text-xl
          font-bold
          text-white
        "
      >
        {value}
      </h3>

      <p
        className="
          mt-1
          text-sm
          text-zinc-500
        "
      >
        {label}
      </p>
    </div>
  );
}