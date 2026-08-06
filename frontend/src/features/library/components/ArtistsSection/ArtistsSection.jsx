import LibrarySection from "../LibrarySection";

import ArtistCard, {
  ArtistCardSkeleton,
} from "@/features/home/components/ArtistCard";

export default function ArtistsSection({
  artists = [],
  loading = false,
}) {
  return (
    <LibrarySection
      title="Followed Artists"
      subtitle="Artists you follow"
      count={artists.length}
    >
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

          {Array.from({ length: 6 }).map((_, index) => (
            <ArtistCardSkeleton
              key={index}
            />
          ))}

        </div>
      ) : artists.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

          {artists.map((artist) => (
            <ArtistCard
              key={artist._id}
              artist={artist}
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
            No followed artists yet.
          </p>
        </div>
      )}

      {/* ==========================================
          FUTURE FEATURES
          ------------------------------------------
          □ Follow Artist
          □ Unfollow Artist
          □ Artist Notifications
          □ Verified Artists
          □ Artist Recommendations
          □ Similar Artists
          □ Concert Updates
          □ Share Artist
          ========================================== */}

    </LibrarySection>
  );
}