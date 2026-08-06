import LibrarySection from "../LibrarySection";

import AlbumCard, {
  AlbumCardSkeleton,
} from "@/features/home/components/AlbumCard";

export default function AlbumsSection({
  albums = [],
  loading = false,
}) {
  return (
    <LibrarySection
      title="Saved Albums"
      subtitle="Albums you've added to your library"
      count={albums.length}
    >
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

          {Array.from({ length: 6 }).map((_, index) => (
            <AlbumCardSkeleton
              key={index}
            />
          ))}

        </div>
      ) : albums.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

          {albums.map((album) => (
            <AlbumCard
              key={album._id}
              album={album}
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
            No saved albums yet.
          </p>
        </div>
      )}

      {/* ==========================================
          FUTURE FEATURES
          ------------------------------------------
          □ Save Album
          □ Remove Album
          □ Album Statistics
          □ Recently Added
          □ Album Rating
          □ Album Notes
          □ Download Album
          □ Share Album
          ========================================== */}

    </LibrarySection>
  );
}