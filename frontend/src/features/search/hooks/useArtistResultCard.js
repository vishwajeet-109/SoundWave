import { useCallback } from "react";

export function useArtistResultCard({ artist, onPlay }) {
  const handlePlay = useCallback(() => {
    onPlay?.(artist);
  }, [artist, onPlay]);

  return {
    artist,
    handlePlay,
  };
}
