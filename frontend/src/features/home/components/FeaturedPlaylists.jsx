import SectionHeader from "./SectionHeader";
import PlaylistCard from "./PlaylistCard";

export default function FeaturedPlaylists({
  playlists = [],
  loading = false,
  onPlay,
}) {
  return (
    <section className="mt-14">
      <SectionHeader
        title="Featured Playlists"
        href="/playlists"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="h-64 animate-pulse rounded-2xl bg-zinc-800"
            />
          ))
        ) : playlists.length > 0 ? (
          playlists.map((playlist) => (
            <PlaylistCard
              key={playlist._id}
              playlist={playlist}
              onPlay={onPlay}
            />
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400">
            No featured playlists available.
          </div>
        )}
      </div>
    </section>
  );
}