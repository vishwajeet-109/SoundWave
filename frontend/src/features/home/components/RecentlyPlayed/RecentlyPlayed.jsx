import SectionHeader from "../SectionHeader";
import MusicCard from "../MusicCard";
import { MusicCardSkeleton } from "../MusicCard";

export default function RecentlyPlayed({
  songs = [],
  loading,
  onPlay,
}) {
  return (
    <section className="mt-12">

      <SectionHeader
        title="Recently Played"
      />

      <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">

        {loading
          ? Array.from({ length: 6 }).map((_, index) => (
              <MusicCardSkeleton key={index} />
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