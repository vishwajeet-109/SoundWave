import { useMemo } from "react";

import { useSongs } from "./useSongs";
import { useAlbums } from "./useAlbums";
import { useArtists } from "./useArtists";
import { usePlaylists } from "./usePlaylists";
import { useHistory } from "./useHistory";

import useAuth from "@/hooks/useAuth";

function useHome() {
  const songsQuery = useSongs();

  const albumsQuery = useAlbums();

  const artistsQuery = useArtists();

  const playlistsQuery = usePlaylists();

  const {
    isAuthenticated,
  } = useAuth();

  const historyQuery = useHistory({
    enabled: isAuthenticated,
    retry: false,
  });

  const isLoading =
    songsQuery.isLoading ||
    albumsQuery.isLoading ||
    artistsQuery.isLoading ||
    playlistsQuery.isLoading ||
    (isAuthenticated && historyQuery.isLoading);

  // 🛡️ Excluded historyQuery.isError so a history 404 doesn't break the entire Home page
  const isError =
    songsQuery.isError ||
    albumsQuery.isError ||
    artistsQuery.isError ||
    playlistsQuery.isError;

  const songs =
    songsQuery.data?.songs ??
    songsQuery.data?.items ??
    songsQuery.data ??
    [];

  const albums =
    albumsQuery.data?.albums ??
    albumsQuery.data?.items ??
    albumsQuery.data ??
    [];

  const artists =
    artistsQuery.data?.artists ??
    artistsQuery.data?.items ??
    artistsQuery.data ??
    [];

  const playlists =
    playlistsQuery.data?.playlists ??
    playlistsQuery.data?.items ??
    playlistsQuery.data ??
    [];

  const history =
    historyQuery.data?.history ??
    historyQuery.data?.items ??
    historyQuery.data ??
    [];

  const data = useMemo(
    () => ({
      songs,
      albums,
      artists,
      playlists,
      history,
    }),
    [
      songs,
      albums,
      artists,
      playlists,
      history,
    ]
  );

  const refetch = () => {
    songsQuery.refetch();

    albumsQuery.refetch();

    artistsQuery.refetch();

    playlistsQuery.refetch();

    if (isAuthenticated) {
      historyQuery.refetch();
    }
  };

  return {
    ...data,

    isLoading,

    isError,

    refetch,
  };
}

export { useHome };
export default useHome;