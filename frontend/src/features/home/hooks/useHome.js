import { useMemo } from "react";

import { useSongs } from "./useSongs";
import { useAlbums } from "./useAlbums";
import { useArtists } from "./useArtists";
import { usePlaylists } from "./usePlaylists";
import { useHistory } from "./useHistory";

import { useAuth } from "@/context/AuthContext";

export function useHome() {
  const songsQuery = useSongs();
  const albumsQuery = useAlbums();
  const artistsQuery = useArtists();
  const playlistsQuery = usePlaylists();

  const { isAuthenticated } = useAuth();

  const historyQuery = useHistory({
    enabled: isAuthenticated,
  });

  const isLoading =
    songsQuery.isLoading ||
    albumsQuery.isLoading ||
    artistsQuery.isLoading ||
    playlistsQuery.isLoading ||
    (isAuthenticated && historyQuery.isLoading);

  const isError =
    songsQuery.isError ||
    albumsQuery.isError ||
    artistsQuery.isError ||
    playlistsQuery.isError;

  const data = useMemo(
    () => ({
      songs: songsQuery.data?.songs ?? [],
      albums: albumsQuery.data?.items ?? [],
      artists: artistsQuery.data?.items ?? artistsQuery.data ?? [],
      playlists: playlistsQuery.data?.items ?? [],
      history: historyQuery.data ?? [],
    }),
    [
      songsQuery.data,
      albumsQuery.data,
      artistsQuery.data,
      playlistsQuery.data,
      historyQuery.data,
    ]
  );

  return {
    ...data,

    isLoading,

    isError,

    refetch: () => {
      songsQuery.refetch();
      albumsQuery.refetch();
      artistsQuery.refetch();
      playlistsQuery.refetch();

      if (isAuthenticated) {
        historyQuery.refetch();
      }
    },
  };
}