import SectionHeader from "./SectionHeader";
import PlaylistCard, {
  PlaylistCardSkeleton,
} from "./PlaylistCard";

export default function MadeForYou({
  playlists = [],
  loading = false,
  onPlay,
}) {
  return (
    <section className="mt-14">
      <SectionHeader
        title="Made For You"
        subtitle="Personalized playlists"
        href="/playlists"
      />

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <PlaylistCardSkeleton key={index} />
          ))}
        </div>
      ) : playlists.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">
          {playlists.map((playlist) => (
            <PlaylistCard
              key={playlist._id}
              playlist={playlist}
              onPlay={onPlay}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
          <p className="text-sm text-zinc-500">
            No personalized playlists available.
          </p>
        </div>
      )}
    </section>
  );
}