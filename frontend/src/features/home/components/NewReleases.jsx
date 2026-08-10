import SectionHeader from "./SectionHeader";
import AlbumCard from "./AlbumCard";

export default function NewReleases({
  albums = [],
  loading = false,
  onPlay,
}) {
  return (
    <section className="mt-14">
      <SectionHeader
        title="New Releases"
        href="/albums"
      />

      {loading ? (
        // Baaki sections ke skeleton grid ke barabar
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="aspect-square animate-pulse rounded-2xl bg-zinc-800"
            />
          ))}
        </div>
      ) : albums.length > 0 ? (
        // 🚀 Exact same grid columns as other sections (2 -> 3 -> 4 -> 6)
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {albums.map((album) => (
            <AlbumCard
              key={album._id}
              album={album}
              playlist={albums}
              onPlay={onPlay}
            />
          ))}
        </div>
      ) : (
        <div className="flex h-40 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
          <p className="text-sm text-zinc-500">
            No albums available.
          </p>
        </div>
      )}
    </section>
  );
}