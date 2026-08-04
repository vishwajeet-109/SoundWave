import MusicCard from "@/features/home/components/MusicCard";

export default function AlbumResultCard({
  album,
  onPlay,
}) {
  return (
    <MusicCard
      song={{
        _id: album._id,
        title: album.title,
        coverImage: album.coverImage,
        artist: album.artist,
      }}
      onPlay={() => onPlay?.(album)}
    />
  );
}