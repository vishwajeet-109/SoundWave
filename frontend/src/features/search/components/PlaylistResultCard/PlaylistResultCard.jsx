import PlaylistCard from "@/features/home/components/PlaylistCard";
import { usePlaylistResultCard } from "../../hooks/usePlaylistResultCard";

export default function PlaylistResultCard({
  playlist,
  onPlay,
}) {
  const { handlePlay } = usePlaylistResultCard({ playlist, onPlay });

  return (
    <PlaylistCard
      playlist={playlist}
      onPlay={handlePlay}
    />
  );
}