import ArtistCard, {
  ArtistCardSkeleton,
} from "./ArtistCard";
import SectionHeader from "./SectionHeader";

export default function PopularArtists({
  artists = [],
  loading = false,
  onPlay,
}) {
  return (
    <section className="mt-14">

      <SectionHeader
        title="Popular Artists"
        href="/artists"
      />

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">

        {loading ? (
          Array.from({ length: 6 }).map((_, index) => (
  <ArtistCardSkeleton key={index} />
))
        ) : artists.length > 0 ? (
          artists.map((artist) => (
            <ArtistCard
              key={artist._id}
              artist={artist}
              onPlay={onPlay}
            />
          ))
        ) : (
          <div className="col-span-full rounded-xl border border-zinc-800 bg-zinc-900/50 p-8 text-center text-zinc-400">
            No artists available.
          </div>
        )}

      </div>

    </section>
  );
}