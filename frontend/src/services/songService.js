import api from "./api";

class SongService {
  getAll(params = {}) {
    return api.get("/songs", {
      params,
    });
  }

  getById(songId) {
    return api.get(`/songs/${songId}`);
  }

  getTrending(limit = 10) {
    return api.get("/songs", {
      params: {
        limit,
      },
    });
  }

  getMySongs() {
    return api.get("/songs/my-songs");
  }

  create(formData) {
    return api.post("/songs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  update(songId, formData) {
    return api.patch(`/songs/${songId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  }

  delete(songId) {
    return api.delete(`/songs/${songId}`);
  }

  approve(songId) {
    return api.patch(`/songs/${songId}/approve`);
  }

  reject(songId, reason) {
    return api.patch(`/songs/${songId}/reject`, {
      reason,
    });
  }
}

export default new SongService();