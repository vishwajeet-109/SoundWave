import { useMemo, useCallback } from "react";
import { useMediaCardBase } from "./useMediaCardBase";

const PLACEHOLDER =
  "https://placehold.co/600x600/171717/ffffff?text=♪";

export function useMusicCard({ song, playlist = [], onPlay }) {
  const cover = useMemo(
    () => song?.coverImage || song?.cover || PLACEHOLDER,
    [song]
  );

  const artist = useMemo(
    () => song?.artist?.name || song?.artistName || "Unknown Artist",
    [song]
  );

  const duration = useMemo(() => song?.duration || "--:--", [song]);

  const genre = useMemo(
    () => song?.genre?.name || song?.genre || "Music",
    [song]
  );

  const albumId = useMemo(
    () => song?.album?._id || song?.albumId || song?.album_id,
    [song]
  );

  const baseCard = useMediaCardBase({
    item: song,
    itemType: "song",
    placeholder: PLACEHOLDER,
    navigatePath: () => (albumId ? `/albums/${albumId}` : "/"),
    onPlay,
    playlist,
    getPrimarySong: (item) => item ?? null,
  });

  const handleLike = useCallback((event) => {
    event?.stopPropagation?.();
  }, []);

  const handleMenu = useCallback((event) => {
    event?.stopPropagation?.();
  }, []);

  return {
    cover: baseCard.image || cover,
    artist,
    duration,
    genre,
    albumId,
    handleNavigate: baseCard.handleNavigate,
    handlePlay: baseCard.handlePlay,
    handleLike,
    handleMenu,
  };
}