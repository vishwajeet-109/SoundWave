import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { usePlayerContext } from "@/context/PlayerContext";

const DEFAULT_COVER =
  "https://placehold.co/600x600/171717/ffffff?text=Music";

export function useMusicCard({
  song,
  playlist = [],
  onPlay,
}) {
  const navigate = useNavigate();

  const {
    playSong,
  } = usePlayerContext();

  const cover = useMemo(() => {
    return (
      song?.coverImage ||
      song?.cover ||
      song?.thumbnail ||
      song?.album?.coverImage ||
      song?.album?.cover ||
      DEFAULT_COVER
    );
  }, [song]);

  const artist = useMemo(() => {
    if (!song) return "Unknown Artist";

    if (typeof song.artist === "string") {
      return song.artist;
    }

    if (song.artist?.name) {
      return song.artist.name;
    }

    if (song.artistName) {
      return song.artistName;
    }

    return "Unknown Artist";
  }, [song]);

  const duration = useMemo(() => {
    if (!song) return "--:--";

    return (
      song.duration ||
      song.durationFormatted ||
      "--:--"
    );
  }, [song]);

  const genre = useMemo(() => {
    return (
      song?.genre?.name ||
      song?.genre ||
      "Music"
    );
  }, [song]);

  const handleNavigate = useCallback(() => {
    if (!song?._id) return;

    navigate(`/songs/${song._id}`);
  }, [navigate, song]);

  const handlePlay = useCallback(
    (event) => {
      event?.stopPropagation();

      playSong(song, playlist);

      onPlay?.(song);
    },
    [
      playSong,
      playlist,
      song,
      onPlay,
    ]
  );

  const handleLike = useCallback((event) => {
    event?.stopPropagation();

    console.log("Like Song:", song?._id);
  }, [song]);

  const handleMenu = useCallback((event) => {
    event?.stopPropagation();

    console.log("Open Menu:", song?._id);
  }, [song]);

  return {
    cover,
    artist,
    duration,
    genre,

    handleNavigate,
    handlePlay,
    handleLike,
    handleMenu,
  };
}

export default useMusicCard;