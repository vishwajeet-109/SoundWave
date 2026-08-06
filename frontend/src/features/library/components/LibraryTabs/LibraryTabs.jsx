import { motion } from "framer-motion";

const TABS = [
  "All",
  "Liked Songs",
  "Playlists",
  "Albums",
  "Artists",
  "Recently Played",
];

export default function LibraryTabs({
  active,
  onChange,
}) {
  return (
    <div className="flex flex-wrap gap-3">

      {TABS.map((tab) => (
        <button
          key={tab}
          type="button"
          onClick={() => onChange(tab)}
          className="
            relative
            overflow-hidden
            rounded-full
            px-5
            py-2.5
            text-sm
            font-medium
            transition
          "
        >
          {active === tab && (
            <motion.div
              layoutId="library-tab"
              className="
                absolute
                inset-0
                rounded-full
                bg-green-500
              "
              transition={{
                type: "spring",
                stiffness: 350,
                damping: 30,
              }}
            />
          )}

          <span
            className={`relative z-10 ${
              active === tab
                ? "text-black"
                : "text-zinc-400"
            }`}
          >
            {tab}
          </span>
        </button>
      ))}

      {/* ==========================================
          FUTURE
          ------------------------------------------
          □ Search
          □ Sort
          □ Filter
          □ Grid/List Toggle
          □ Drag & Drop
          □ Multi Select
          □ Smart Collections
          ========================================== */}

    </div>
  );
}