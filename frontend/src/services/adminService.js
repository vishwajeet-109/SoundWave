import api from "./api";

const adminService = {
  // =========================
  // Categories Management
  // =========================
  listCategories(all = false) {
    return api.get(`/admin/categories?all=${all}`);
  },

  createCategory(categoryData) {
    return api.post("/admin/categories", categoryData);
  },

  updateCategory(categoryId, categoryData) {
    return api.put(`/admin/categories/${categoryId}`, categoryData);
  },

  deleteCategory(categoryId) {
    return api.delete(`/admin/categories/${categoryId}`);
  },

  // =========================
  // Song Approval & Management
  // =========================
  getPendingSongs(params = {}) {
    return api.get("/admin/songs/pending", { params });
  },

  getApprovedSongs(params = {}) {
    return api.get("/admin/songs/approved", { params });
  },

  getRejectedSongs(params = {}) {
    return api.get("/admin/songs/rejected", { params });
  },

  getBlockedSongs(params = {}) {
    return api.get("/admin/songs/blocked", { params });
  },

  approveSong(songId, note = "") {
    return api.post(`/admin/songs/${songId}/approve`, { note });
  },

  rejectSong(songId, reason = "") {
    return api.post(`/admin/songs/${songId}/reject`, { reason });
  },

  blockSong(songId, reason = "") {
    return api.post(`/admin/songs/${songId}/block`, { reason });
  },

  unblockSong(songId) {
    return api.post(`/admin/songs/${songId}/unblock`);
  },

  getApprovalStats() {
    return api.get("/admin/songs/stats");
  },

  // =========================
  // Artist Management
  // =========================
  createArtist(artistData) {
    return api.post("/admin/artists/create", artistData);
  },

  getAllArtists() {
    return api.get("/admin/artists");
  },

  deleteArtist(id) {
    return api.delete(`/admin/artists/${id}`);
  },
};

export default adminService;