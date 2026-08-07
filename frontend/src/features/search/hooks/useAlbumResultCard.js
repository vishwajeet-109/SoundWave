import { useCallback, useMemo } from "react";

export function useAlbumResultCard({ album, onPlay }) {
  const song = useMemo(
    () => ({
      _id: album?._id,
      title: album?.title,
      coverImage: album?.coverImage,
      artist: album?.artist,
    }),
    [album]
  );

  const handlePlay = useCallback(() => {
    onPlay?.(album);
  }, [album, onPlay]);

  return {
    song,
    handlePlay,
  };
}
