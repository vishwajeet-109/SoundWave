import { useCallback } from "react";

export function usePlaylistResultCard({ playlist, onPlay }) {
  const handlePlay = useCallback(() => {
    onPlay?.(playlist);
  }, [playlist, onPlay]);

  return {
    playlist,
    handlePlay,
  };
}
