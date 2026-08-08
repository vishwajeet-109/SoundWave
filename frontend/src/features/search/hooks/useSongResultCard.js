import { useMemo, useCallback } from "react";

const PLACEHOLDER =
  "https://placehold.co/600x600/171717/ffffff?text=♪";

export function useSongResultCard({ song }) {
  const cover = useMemo(
    () => song?.coverImage || song?.cover || PLACEHOLDER,
    [song]
  );

  const title = useMemo(
    () => song?.title || "Untitled",
    [song]
  );

  const artist = useMemo(
    () =>
      song?.artist?.name ||
      song?.artistName ||
      song?.artist ||
      "Unknown Artist",
    [song]
  );

  const handlePlay = useCallback((e) => {
    e.stopPropagation();
  }, []);

  return {
    cover,
    title,
    artist,
    handlePlay,
  };
}