import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { usePlayerContext } from "@/context/PlayerContext";
import { resolveMediaImage } from "@/shared/utils/media";

export function useMediaCardBase({
  item,
  itemType,
  placeholder,
  navigatePath,
  onPlay,
  playlist = [],
  getPrimarySong,
}) {
  const navigate = useNavigate();
  const { playSong } = usePlayerContext();

  const image = useMemo(
    () => resolveMediaImage(item?.coverImage || item?.cover || item?.image || item?.avatar || item?.profileImage, placeholder),
    [item, placeholder]
  );

  const title = useMemo(() => item?.title || item?.name || "Untitled", [item]);

  const subtitle = useMemo(() => {
    if (itemType === "artist") {
      return item?.subtitle || "Artist";
    }

    return item?.artist?.name || item?.artistName || item?.owner?.name || item?.user?.name || item?.createdBy?.name || "Unknown";
  }, [item, itemType]);

  const meta = useMemo(() => {
    if (itemType === "song") {
      return item?.duration || "--:--";
    }

    if (itemType === "album") {
      return item?.songs?.length ? `${item.songs.length} Songs` : "Album";
    }

    if (itemType === "playlist") {
      return item?.songs?.length ? `${item.songs.length} Songs` : "Playlist";
    }

    return null;
  }, [item, itemType]);

  const handleNavigate = useCallback(() => {
    if (!item?._id) return;
    navigate(navigatePath(item));
  }, [item, navigate, navigatePath]);

  const handlePlay = useCallback(
    (event) => {
      event?.stopPropagation?.();

      const primarySong = getPrimarySong?.(item) ?? null;
      const safePlaylist = Array.isArray(playlist) ? playlist : [];

      if (primarySong) {
        playSong(primarySong, safePlaylist.length ? safePlaylist : [primarySong]);
      }

      onPlay?.(item);
    },
    [item, playlist, getPrimarySong, onPlay, playSong]
  );

  return {
    image,
    title,
    subtitle,
    meta,
    handleNavigate,
    handlePlay,
  };
}
