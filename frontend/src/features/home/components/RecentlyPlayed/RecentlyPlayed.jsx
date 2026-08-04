import SectionHeader from "../SectionHeader";
import MusicCard from "../MusicCard";
import { MusicCardSkeleton } from "../MusicCard";

export default function RecentlyPlayed({
  songs = [],
  loading = false,
  onPlay,
}) {
  return (
    <section className="mt-12">
      <SectionHeader
        title="Recently Played"
        href="/history"
      />

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
            <MusicCardSkeleton key={index} />
          ))
        ) : songs.length > 0 ? (
          songs.map((song) => (
            <MusicCard
              key={song._id}
              song={song}
              onPlay={onPlay}
            />
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400">
            No recently played songs.
          </div>
        )}
      </div>
    </section>
  );
}