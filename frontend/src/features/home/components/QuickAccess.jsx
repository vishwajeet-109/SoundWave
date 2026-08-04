import { Play } from "lucide-react";

export default function QuickAccess({
    songs = [],
    onPlay,
}) {

    return (

        <section className="mb-12">

            <div className="grid grid-cols-2 gap-4 xl:grid-cols-4">

                {songs.slice(0,8).map(song => (

                    <button

                        key={song._id}

                        onClick={()=>onPlay(song)}

                        className="group flex items-center overflow-hidden rounded-xl bg-zinc-800/70 transition hover:bg-zinc-700"

                    >

                        <img

                            src={song.coverImage}

                            className="h-20 w-20 object-cover"

                        />

                        <div className="flex flex-1 items-center justify-between px-5">

                            <span className="font-medium">

                                {song.title}

                            </span>

                            <div

                                className="flex h-11 w-11 items-center justify-center rounded-full bg-primary opacity-0 shadow-lg transition group-hover:opacity-100"

                            >

                                <Play
                                    size={18}
                                    fill="currentColor"
                                />

                            </div>

                        </div>

                    </button>

                ))}

            </div>

        </section>

    );

}