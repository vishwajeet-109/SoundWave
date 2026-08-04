import SectionHeader from "./SectionHeader";
import PlaylistCard from "./PlaylistCard";

export default function MadeForYou({
  playlists = [],
  onPlay,
}) {
  return (
    <section className="mt-14">

      <SectionHeader
        title="Made For You"
        subtitle="Personalized playlists"
        href="/playlists"
      />

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6">

        {playlists.map((playlist) => (
          <PlaylistCard
            key={playlist._id}
            playlist={playlist}
            onPlay={onPlay}
          />
        ))}

      </div>

    </section>
  );
}