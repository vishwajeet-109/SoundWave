import { useMemo, useCallback } from "react";
import { useNavigate } from "react-router-dom";

import { usePlayerContext } from "@/context/PlayerContext";

const DEFAULT_IMAGE =
  "https://placehold.co/500x500/171717/ffffff?text=Artist";

export function useArtistCard({
  artist,
  onPlay,
}) {
  const navigate = useNavigate();

  const { playSong } = usePlayerContext();

  const image = useMemo(() => {
    return (
      artist?.image ||
      artist?.avatar ||
      artist?.photo ||
      artist?.profileImage ||
      artist?.coverImage ||
      DEFAULT_IMAGE
    );
  }, [artist]);

  const artistName = useMemo(() => {
    return (
      artist?.name ||
      artist?.artistName ||
      artist?.username ||
      "Unknown Artist"
    );
  }, [artist]);

  const monthlyListeners = useMemo(() => {
    return (
      artist?.monthlyListeners ||
      artist?.listeners ||
      artist?.stats?.monthlyListeners ||
      0
    );
  }, [artist]);

  const followers = useMemo(() => {
    return (
      artist?.followersCount ||
      artist?.followers ||
      artist?.stats?.followers ||
      0
    );
  }, [artist]);

  const topSongs = useMemo(() => {
    return (
      artist?.topSongs ||
      artist?.songs ||
      artist?.tracks ||
      []
    );
  }, [artist]);

  const handleNavigate = useCallback(() => {
    if (!artist?._id) return;

    navigate(`/artist/${artist._id}`);
  }, [navigate, artist]);

  const handlePlay = useCallback(
    (event) => {
      event?.stopPropagation();

      if (!topSongs.length) return;

      playSong(topSongs[0], topSongs);

      onPlay?.(artist);
    },
    [
      topSongs,
      playSong,
      onPlay,
      artist,
    ]
  );

  return {
    image,
    artistName,
    monthlyListeners,
    followers,
    topSongs,

    handleNavigate,
    handlePlay,
  };
}

export default useArtistCard;