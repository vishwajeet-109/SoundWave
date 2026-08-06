import api from "./api";

class PlaylistService {
  getAll(params = {}) {
    return api.get("/playlists", {
      params,
    });
  }

  getById(id) {
    return api.get(`/playlists/${id}`);
  }

  create(data) {
    return api.post("/playlists", data);
  }

  update(id, data) {
    return api.patch(`/playlists/${id}`, data);
  }

  delete(id) {
    return api.delete(`/playlists/${id}`);
  }

  addSong(id, songId) {
    return api.post(`/playlists/${id}/songs`, {
      songId,
    });
  }

  removeSong(id, songId) {
    return api.delete(`/playlists/${id}/songs`, {
      data: {
        songId,
      },
    });
  }
}

export default new PlaylistService();