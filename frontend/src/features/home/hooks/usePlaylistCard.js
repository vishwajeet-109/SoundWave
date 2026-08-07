import { useMemo } from "react";
import { useMediaCardBase } from "./useMediaCardBase";

const PLACEHOLDER =
  "https://placehold.co/600x600/171717/ffffff?text=Playlist";

export function usePlaylistCard({ playlist, onPlay }) {
  const title = useMemo(
    () => playlist?.title || playlist?.name || "Untitled Playlist",
    [playlist]
  );

  const owner = useMemo(
    () =>
      playlist?.owner?.name ||
      playlist?.user?.name ||
      playlist?.createdBy?.name ||
      "Unknown",
    [playlist]
  );

  const songs = useMemo(() => playlist?.songs ?? [], [playlist]);

  const baseCard = useMediaCardBase({
    item: playlist,
    itemType: "playlist",
    placeholder: PLACEHOLDER,
    navigatePath: (item) => (item?._id ? `/playlists/${item._id}` : "/"),
    onPlay,
    playlist: songs,
    getPrimarySong: () => songs[0] ?? null,
  });

  return {
    cover: baseCard.image,
    title,
    owner,
    songs,
    handleNavigate: baseCard.handleNavigate,
    handlePlay: baseCard.handlePlay,
  };
}
