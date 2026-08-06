import SectionHeader from "./SectionHeader";
import MusicCard, {
  MusicCardSkeleton,
} from "./MusicCard";

export default function ContinueListening({
  songs = [],
  loading = false,
  onPlay,
}) {
  return (
    <section className="mt-14">
      <SectionHeader
        title="Continue Listening"
        subtitle="Resume where you left off"
        href="/history"
      />

      {loading ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <MusicCardSkeleton key={index} />
          ))}
        </div>
      ) : songs.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">
          {songs.slice(0, 6).map((song) => {
            console.log("Song =", song);
            return (
              <MusicCard
                key={song._id}
                song={song}
                playlist={songs}
                onPlay={onPlay}
              />
            );
          })}
        </div>
      ) : (
        <div className="flex h-40 flex-col items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-900">
          <h3 className="text-lg font-semibold text-white">
            Nothing to continue
          </h3>

          <p className="mt-2 text-sm text-zinc-500">
            Play some songs and they'll appear here.
          </p>
        </div>
      )}
    </section>
  );
}