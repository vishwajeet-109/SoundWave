import { useMemo } from "react";
import { useSongs } from "./useSongs";
import { useAlbums } from "./useAlbums";
import { useArtists } from "./useArtists";
import { usePlaylists } from "./usePlaylists";
import { useHistory } from "./useHistory";
import useAuth from "@/hooks/useAuth";

// 🛡️ Universal extractor to handle any backend response structure safely
const extractList = (queryResult, key) => {
  const raw = queryResult?.data ?? queryResult;
  if (!raw) return [];
  if (Array.isArray(raw)) return raw;
  if (Array.isArray(raw[key])) return raw[key];
  if (Array.isArray(raw.data)) return raw.data;
  if (Array.isArray(raw.items)) return raw.items;
  
  if (raw.data && typeof raw.data === "object") {
    if (Array.isArray(raw.data[key])) return raw.data[key];
    if (Array.isArray(raw.data.items)) return raw.data.items;
    if (Array.isArray(raw.data.data)) return raw.data.data;
  }
  
  return [];
};

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
    playlistsQuery.isError ||
    (isAuthenticated && historyQuery.isError);

  const songs = useMemo(() => extractList(songsQuery, "songs"), [songsQuery.data]);
  const albums = useMemo(() => extractList(albumsQuery, "albums"), [albumsQuery.data]);
  const artists = useMemo(() => extractList(artistsQuery, "artists"), [artistsQuery.data]);
  const playlists = useMemo(() => extractList(playlistsQuery, "playlists"), [playlistsQuery.data]);
  const history = useMemo(() => extractList(historyQuery, "history"), [historyQuery.data]);

  const data = useMemo(
    () => ({
      songs,
      albums,
      artists,
      playlists,
      history,
    }),
    [songs, albums, artists, playlists, history]
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

export default useHome;