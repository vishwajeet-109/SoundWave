import { Play } from "lucide-react";
import { useSongResultCard } from "../../hooks/useSongResultCard";

export default function SongResultCard({ song }) {
  const { cover, title, artist } = useSongResultCard({ song });

  return (
    <div className="group rounded-2xl bg-zinc-900 p-4 transition-all duration-300 hover:bg-zinc-800 hover:-translate-y-1">

      <div className="relative overflow-hidden rounded-xl">

        <img
          src={cover}
          alt={title}
          className="aspect-square w-full object-cover"
        />

        <button
          className="
            absolute
            bottom-3
            right-3
            flex
            h-12
            w-12
            items-center
            justify-center
            rounded-full
            bg-green-500
            opacity-0
            transition-all
            duration-300
            group-hover:opacity-100
          "
        >
          <Play
            size={20}
            fill="black"
          />
        </button>

      </div>

      <h3 className="mt-4 font-semibold text-white">
        {title}
      </h3>

      <p className="text-sm text-zinc-400">
        {artist}
      </p>

    </div>
  );
}