import ArtistCard from "@/features/home/components/ArtistCard";

export default function ArtistResultCard({
  artist,
  onPlay,
}) {
  return (
    <ArtistCard
      artist={artist}
      onPlay={() => onPlay?.(artist)}
    />
  );
}