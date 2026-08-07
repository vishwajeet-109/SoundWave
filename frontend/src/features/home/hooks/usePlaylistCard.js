import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { usePlayerContext } from "@/context/PlayerContext";
const DEFAULT_COVER =
  "https://placehold.co/600x600/171717/ffffff?text=Playlist";

export function usePlaylistCard({
  playlist,
}) {
  const navigate = useNavigate();

  const { playSong } = usePlayerContext();

  const cover = useMemo(() => {
    return (
      playlist?.coverImage ||
      playlist?.cover ||
      playlist?.thumbnail ||
      playlist?.image ||
      DEFAULT_COVER
    );
  }, [playlist]);

  const title = useMemo(() => {
    return (
      playlist?.title ||
      playlist?.name ||
      "Untitled Playlist"
    );
  }, [playlist]);

  const owner = useMemo(() => {
    if (!playlist) return "Unknown";

    if (typeof playlist.owner === "string") {
      return playlist.owner;
    }

    if (playlist.owner?.name) {
      return playlist.owner.name;
    }

    if (playlist.owner?.username) {
      return playlist.owner.username;
    }

    if (playlist.createdBy?.name) {
      return playlist.createdBy.name;
    }

    return "Unknown";
  }, [playlist]);

  const songs = useMemo(() => {
    return (
      playlist?.songs ||
      playlist?.tracks ||
      []
    );
  }, [playlist]);

  const handleNavigate = useCallback(() => {
    if (!playlist?._id) return;

    navigate(`/playlist/${playlist._id}`);
  }, [navigate, playlist]);

  const handlePlay = useCallback(
    (event) => {
      event?.stopPropagation();

      if (!songs.length) return;

      playSong(
        songs[0],
        songs
      );
    },
    [
      songs,
      playSong,
    ]
  );

  return {
    cover,
    title,
    owner,
    songs,

    handleNavigate,
    handlePlay,
  };
}

export default usePlaylistCard;