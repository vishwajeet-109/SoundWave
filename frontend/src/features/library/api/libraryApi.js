import historyService from "@/services/historyService";
import playlistService from "@/services/playlistService";

export async function getLibrary() {
  const [historyResult, playlistResult] = await Promise.allSettled([
    historyService.getHistory(),
    playlistService.getAll(),
  ]);

  const recentlyPlayed =
    historyResult.status === "fulfilled"
      ? historyResult.value.data?.data ?? []
      : [];

  const playlists =
    playlistResult.status === "fulfilled"
      ? playlistResult.value.data?.data ?? []
      : [];

  return {
    likedSongs: [],
    playlists,
    albums: [],
    artists: [],
    recentlyPlayed,
  };
}