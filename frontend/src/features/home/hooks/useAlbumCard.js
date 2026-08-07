import { useMemo } from "react";
import { useMediaCardBase } from "./useMediaCardBase";

const PLACEHOLDER =
  "https://placehold.co/600x600/171717/ffffff?text=Album";

export function useAlbumCard({ album }) {
  const artist = useMemo(
    () => album?.artist?.name || album?.artistName || "Unknown Artist",
    [album]
  );

  const songs = useMemo(() => album?.songs ?? [], [album]);

  const year = useMemo(() => {
    if (!album?.releaseDate) return null;

    return new Date(album.releaseDate).getFullYear();
  }, [album]);

  const baseCard = useMediaCardBase({
    item: album,
    itemType: "album",
    placeholder: PLACEHOLDER,
    navigatePath: (item) => (item?._id ? `/albums/${item._id}` : "/"),
    onPlay: undefined,
    playlist: songs,
    getPrimarySong: () => songs[0] ?? null,
  });

  return {
    cover: baseCard.image,
    artist,
    songs,
    year,
    handleNavigate: baseCard.handleNavigate,
    handlePlay: baseCard.handlePlay,
  };
}