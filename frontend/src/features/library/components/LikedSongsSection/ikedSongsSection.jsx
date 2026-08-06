import LibrarySection from "../LibrarySection";

import MusicCard, {
  MusicCardSkeleton,
} from "@/features/home/components/MusicCard";

export default function LikedSongsSection({
  songs = [],
  loading = false,
}) {
  return (
    <LibrarySection
      title="Liked Songs"
      subtitle="Songs you've liked"
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
            No liked songs yet.
          </p>
        </div>
      )}

      {/* ==========================================
          FUTURE
          ------------------------------------------
          □ Unlike Song
          □ Bulk Remove
          □ Sort by Recently Liked
          □ Shuffle Play
          □ Download Songs
          □ Multi Select
          ========================================== */}

    </LibrarySection>
  );
}