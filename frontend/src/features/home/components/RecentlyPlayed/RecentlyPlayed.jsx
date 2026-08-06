import SectionHeader from "../SectionHeader";
import MusicCard, {
  MusicCardSkeleton,
} from "../MusicCard";

export default function RecentlyPlayed({
  songs = [],
  loading = false,
  onPlay,
}) {
  return (
    <section className="mt-14">

      <SectionHeader
        title="Recently Played"
        href="/me/history"
      />

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">

          {Array.from({ length: 6 }).map((_, index) => (
            <MusicCardSkeleton key={index} />
          ))}

        </div>
      ) : songs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">

          {songs.map((song) => (
            <MusicCard
              key={song._id}
              song={song}
              onPlay={onPlay}
            />
          ))}

        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
          <p className="text-sm text-zinc-500">
            No recently played songs.
          </p>
        </div>
      )}

    </section>
  );
}