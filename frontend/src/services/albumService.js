import api from "./api";

class AlbumService {
  getAll(params = {}) {
    return api.get("/albums", {
      params,
    });
  }

  getById(albumId) {
    return api.get(`/albums/${albumId}`);
  }

  create(data) {
    return api.post("/albums", data);
  }

  update(albumId, data) {
    return api.patch(`/albums/${albumId}`, data);
  }

  delete(albumId) {
    return api.delete(`/albums/${albumId}`);
  }

  addSong(albumId, songId) {
    return api.post(`/albums/${albumId}/songs`, {
      songId,
    });
  }

  removeSong(albumId, songId) {
    return api.delete(`/albums/${albumId}/songs`, {
      data: {
        songId,
      },
    });
  }
}

export default new AlbumService();