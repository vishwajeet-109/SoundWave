import historyService from "@/services/historyService";
import playlistService from "@/services/playlistService";
import songService from "@/services/songService";
import api from "@/services/api";

class LibraryService {
  async getLibrary() {
    const [
      likedSongsResponse,
      playlistsResponse,
      historyResponse,
      albumsResponse,
      artistsResponse,
    ] = await Promise.allSettled([
      api.get("/me/likes"),
      playlistService.getAll(),
      historyService.getHistory(),
      api.get("/albums"),
      api.get("/artists"),
    ]);

    return {
      likedSongs: this.extract(likedSongsResponse),
      playlists: this.extract(playlistsResponse),
      recentlyPlayed: this.extract(historyResponse),
      albums: this.extract(albumsResponse),
      artists: this.extract(artistsResponse),
    };
  }

  extract(result) {
    if (result.status !== "fulfilled") {
      return [];
    }

    const response = result.value?.data;

    if (!response) {
      return [];
    }

    if (Array.isArray(response.data)) {
      return response.data;
    }

    if (Array.isArray(response.data?.items)) {
      return response.data.items;
    }

    if (Array.isArray(response.items)) {
      return response.items;
    }

    if (Array.isArray(response.results)) {
      return response.results;
    }

    return [];
  }
}

export default new LibraryService();