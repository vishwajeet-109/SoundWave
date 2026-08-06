import LibrarySection from "../LibrarySection";

import MusicCard, {
  MusicCardSkeleton,
} from "@/features/home/components/MusicCard";

export default function RecentlyPlayedSection({
  songs = [],
  loading = false,
}) {
  return (
    <LibrarySection
      title="Recently Played"
      subtitle="Jump back into your recent favorites"
      count={songs.length}
    >
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

          {Array.from({ length: 6 }).map((_, index) => (
            <MusicCardSkeleton
              key={index}
            />
          ))}

        </div>
      ) : songs.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

          {songs.map((song) => (
            <MusicCard
              key={song._id}
              song={song}
              playlist={songs}
            />
          ))}

        </div>
      ) : (
        <div
          className="
            flex
            h-44
            items-center
            justify-center
            rounded-3xl
            border
            border-zinc-800
            bg-zinc-900
          "
        >
          <p className="text-zinc-500">
            No recently played songs.
          </p>
        </div>
      )}

      {/* ==========================================
          FUTURE FEATURES
          ------------------------------------------
          □ Resume Playback
          □ Recently Played Date
          □ Listening Duration
          □ Play History
          □ Clear History
          □ Smart Recommendations
          □ Continue Listening
          □ Auto Group By Day
          ========================================== */}

    </LibrarySection>
  );
}