import api from "./api";

class ArtistService {
  getAll(params = {}) {
    return api.get("/artists", {
      params,
    });
  }

  getById(artistId) {
    return api.get(`/artists/${artistId}`);
  }
}

export default new ArtistService();