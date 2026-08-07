import ArtistCard from "@/features/home/components/ArtistCard";
import { useArtistResultCard } from "../../hooks/useArtistResultCard";

export default function ArtistResultCard({
  artist,
  onPlay,
}) {
  const { handlePlay } = useArtistResultCard({ artist, onPlay });

  return (
    <ArtistCard
      artist={artist}
      onPlay={handlePlay}
    />
  );
}