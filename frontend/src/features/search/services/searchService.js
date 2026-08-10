import { searchApi } from "../api/searchApi";

export const searchService = {
  async search(params) {
    let cleanParams = { ...params };

    // Agar type diya gaya hai, toh plural ko singular mein map kar dein
    if (cleanParams.type) {
      const typeMap = {
        albums: "album",
        playlists: "playlist",
        songs: "song",
        artists: "artist",
      };

      // Map check karein ya generic fallback ke tor par aakhiri 's' hata dein
      if (typeMap[cleanParams.type]) {
        cleanParams.type = typeMap[cleanParams.type];
      } else if (cleanParams.type.endsWith("s")) {
        cleanParams.type = cleanParams.type.slice(0, -1);
      }
    }

    const response = await searchApi.search(cleanParams);
    return response.data;
  },
};