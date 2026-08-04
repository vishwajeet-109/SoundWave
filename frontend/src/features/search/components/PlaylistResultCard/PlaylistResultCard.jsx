import PlaylistCard from "@/features/home/components/PlaylistCard";

export default function PlaylistResultCard({
  playlist,
  onPlay,
}) {
  return (
    <PlaylistCard
      playlist={playlist}
      onPlay={() => onPlay?.(playlist)}
    />
  );
}