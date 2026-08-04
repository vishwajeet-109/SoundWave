import ArtistCard from "./ArtistCard";
import SectionHeader from "./SectionHeader";

export default function PopularArtists({
  artists = [],
  onPlay,
}) {
  return (
    <section className="mt-14">

      <SectionHeader
        title="Popular Artists"
        href="/artists"
      />

      <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 xl:grid-cols-6">

        {artists.map((artist) => (
          <ArtistCard
            key={artist._id}
            artist={artist}
            onPlay={onPlay}
          />
        ))}

      </div>

    </section>
  );
}