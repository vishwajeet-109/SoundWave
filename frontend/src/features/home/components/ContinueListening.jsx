import SectionHeader from "./SectionHeader";
import MusicCard from "./MusicCard";
export default function ContinueListening({
    songs = [],
    onPlay,
}) {
    return (

        <section className="mt-14">

            <SectionHeader
                title="Continue Listening"
            />

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-6">

                {songs.map(song => (

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