import SectionHeader from "./SectionHeader";
import MusicCard from "./MusicCard";

export default function NewReleases({
  albums = [],
  onPlay,
}) {
  return (
    <section className="mt-14">

      <SectionHeader
        title="New Releases"
        href="/albums"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

        {albums.map((album) => (
          <MusicCard
            key={album._id}
            song={{
              _id: album._id,
              title: album.title,
              coverImage: album.coverImage,
              artist: album.artist,
            }}
            onPlay={onPlay}
          />
        ))}

      </div>

    </section>
  );
}