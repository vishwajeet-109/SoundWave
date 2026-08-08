import { useCallback } from "react";

function usePlaylistResultCard({ playlist, onPlay }) {
  const handlePlay = useCallback(() => {
    onPlay?.(playlist);
  }, [playlist, onPlay]);

  return {
    playlist,
    handlePlay,
  };
}

export { usePlaylistResultCard };
export default usePlaylistResultCard;
