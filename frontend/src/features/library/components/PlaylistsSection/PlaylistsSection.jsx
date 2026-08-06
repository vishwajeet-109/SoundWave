import LibrarySection from "../LibrarySection";

import PlaylistCard, {
  PlaylistCardSkeleton,
} from "@/features/home/components/PlaylistCard";

export default function PlaylistsSection({
  playlists = [],
  loading = false,
}) {
  return (
    <LibrarySection
      title="Your Playlists"
      subtitle="Playlists you've created or saved"
      count={playlists.length}
    >
      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

          {Array.from({ length: 6 }).map((_, index) => (
            <PlaylistCardSkeleton
              key={index}
            />
          ))}

        </div>
      ) : playlists.length ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist._id}
              playlist={playlist}
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
            No playlists found.
          </p>
        </div>
      )}

      {/* ==========================================
          FUTURE FEATURES
          ------------------------------------------
          □ Create Playlist
          □ Edit Playlist
          □ Delete Playlist
          □ Share Playlist
          □ Download Playlist
          □ Collaborative Playlist
          □ Pin Playlist
          □ Smart Playlist
          ========================================== */}

    </LibrarySection>
  );
}