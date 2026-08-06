import {
  Library,
  PlusCircle,
} from "lucide-react";

import { motion } from "framer-motion";

export default function EmptyLibrary() {
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
        duration: 0.35,
      }}
      className="
        flex
        min-h-[70vh]
        items-center
        justify-center
      "
    >
      <div
        className="
          w-full
          max-w-2xl
          rounded-[32px]
          border
          border-zinc-800
          bg-[#171717]
          p-10
          text-center
        "
      >
        <div
          className="
            mx-auto
            flex
            h-24
            w-24
            items-center
            justify-center
            rounded-full
            bg-green-500/10
            text-green-500
          "
        >
          <Library size={42} />
        </div>

        <h2
          className="
            mt-8
            text-3xl
            font-bold
            text-white
          "
        >
          Your Library is Empty
        </h2>

        <p
          className="
            mt-4
            text-zinc-400
          "
        >
          Start liking songs, following artists,
          and creating playlists to build
          your personal music collection.
        </p>

        <button
          type="button"
          className="
            mt-8
            inline-flex
            items-center
            gap-2
            rounded-full
            bg-green-500
            px-6
            py-3
            font-semibold
            text-black
            transition
            hover:scale-105
          "
        >
          <PlusCircle size={18} />
          Explore Music
        </button>

        {/* ==========================================
            FUTURE FEATURES
            ------------------------------------------
            □ Personalized Recommendations
            □ Quick Import
            □ Recently Played Suggestions
            □ Smart Collection
            □ AI Playlist Generator
            ========================================== */}

      </div>
    </motion.section>
  );
}