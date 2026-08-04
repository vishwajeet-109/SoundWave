import { motion } from "framer-motion";

import TrackRow from "../TrackRow";

export default function TrackList({ tracks }) {
  if (!tracks || tracks.length === 0) {
    return (
      <div className="rounded-2xl border border-border bg-surface p-8 text-center text-sm text-text-secondary">
        This album doesn&apos;t have any songs yet.
      </div>
    );
  }

  return (
    <div
      aria-label="Album tracks"
      className="flex flex-col"
    >
      {tracks.map((track, index) => (
        <motion.div
          key={track?._id ?? track?.id ?? `${index}-${track?.title ?? "track"}`}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.25, delay: Math.min(index * 0.03, 0.3) }}
        >
          <TrackRow
            track={track}
            index={index + 1}
          />
        </motion.div>
      ))}
    </div>
  );
}
