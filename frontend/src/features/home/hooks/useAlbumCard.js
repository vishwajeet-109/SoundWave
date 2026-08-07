import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { usePlayerContext } from "@/context/PlayerContext";

const DEFAULT_COVER =
  "https://placehold.co/600x600/171717/ffffff?text=Album";

export function useAlbumCard({ album }) {
  const navigate = useNavigate();

  const { playSong } = usePlayerContext();

  const cover = useMemo(() => {
    return (
      album?.coverImage ||
      album?.cover ||
      album?.thumbnail ||
      album?.image ||
      DEFAULT_COVER
    );
  }, [album]);

  const artist = useMemo(() => {
    if (!album) return "Unknown Artist";

    if (typeof album.artist === "string") {
      return album.artist;
    }

    if (album.artist?.name) {
      return album.artist.name;
    }

    if (album.artistName) {
      return album.artistName;
    }

    return "Unknown Artist";
  }, [album]);

  const songs = useMemo(() => {
    return (
      album?.songs ||
      album?.tracks ||
      []
    );
  }, [album]);

  const year = useMemo(() => {
    if (album?.year) return album.year;

    if (album?.releaseDate) {
      return new Date(album.releaseDate).getFullYear();
    }

    return null;
  }, [album]);

  const handleNavigate = useCallback(() => {
    if (!album?._id) return;

    navigate(`/album/${album._id}`);
  }, [navigate, album]);

  const handlePlay = useCallback(
    (event) => {
      event?.stopPropagation();

      if (!songs.length) return;

      playSong(
        songs[0],
        songs
      );
    },
    [songs, playSong]
  );

  return {
    cover,
    artist,
    songs,
    year,

    handleNavigate,
    handlePlay,
  };
}

export default useAlbumCard;