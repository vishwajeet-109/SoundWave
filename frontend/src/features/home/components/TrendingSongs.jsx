import SectionHeader from "./SectionHeader";
import MusicCard from "./MusicCard";
import { MusicCardSkeleton } from "./MusicCard";

export default function TrendingSongs({
  songs = [],
  loading,
  onPlay,
}) {
  return (
    <section className="mt-14">

      <SectionHeader
        title="Trending Songs"
        href="/songs"
      />

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">

        {loading
          ? Array.from({ length: 6 }).map((_, i) => (
              <MusicCardSkeleton key={i} />
            ))
          : songs.map((song) => (
              <MusicCard
                key={song._id}
                song={song}
                onPlay={onPlay}
              />
            ))}

      </div>

    </section>
  );
}