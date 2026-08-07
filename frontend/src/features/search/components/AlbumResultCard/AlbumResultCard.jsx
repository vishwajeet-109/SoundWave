import MusicCard from "@/features/home/components/MusicCard";
import { useAlbumResultCard } from "../../hooks/useAlbumResultCard";

export default function AlbumResultCard({
  album,
  onPlay,
}) {
  const { song, handlePlay } = useAlbumResultCard({ album, onPlay });

  return (
    <MusicCard
      song={song}
      onPlay={handlePlay}
    />
  );
}