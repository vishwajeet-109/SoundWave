import { useMemo } from "react";

import { useSongs } from "./useSongs";
import { useAlbums } from "./useAlbums";
import { useArtists } from "./useArtists";
import { usePlaylists } from "./usePlaylists";
import { useHistory } from "./useHistory";

export function useHome() {
  const songsQuery = useSongs();
  const albumsQuery = useAlbums();
  const artistsQuery = useArtists();
  const playlistsQuery = usePlaylists();
  const historyQuery = useHistory();

  const isLoading =
    songsQuery.isLoading ||
    albumsQuery.isLoading ||
    artistsQuery.isLoading ||
    playlistsQuery.isLoading ||
    historyQuery.isLoading;

  const isError =
    songsQuery.isError ||
    albumsQuery.isError ||
    artistsQuery.isError ||
    playlistsQuery.isError ||
    historyQuery.isError;

  const data = useMemo(
    () => ({
      songs: songsQuery.data?.data ?? [],
      albums: albumsQuery.data?.data ?? [],
      artists: artistsQuery.data?.data ?? [],
      playlists: playlistsQuery.data?.data ?? [],
      history: historyQuery.data?.data ?? [],
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
      historyQuery.refetch();
    },
  };
}