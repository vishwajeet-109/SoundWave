import axiosInstance from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

// ============================================================
// Artist Dashboard API
// ============================================================

export const artistDashboardApi = {
  // ----------------------------------------------------------
  // Artist Dashboard Stats
  // GET /api/dashboard/artist
  // ----------------------------------------------------------
  getStats: async () => {
    const response = await axiosInstance.get("/dashboard/artist");
    return response.data;
  },

  // ----------------------------------------------------------
  // Artist's Songs
  // GET /api/songs/my-songs
  // ----------------------------------------------------------
  getRecentUploads: async () => {
    const response = await axiosInstance.get("/songs/my-songs");
    return response.data;
  },

  // ----------------------------------------------------------
  // Artist Notifications
  // GET /api/notifications
  // ----------------------------------------------------------
  getNotifications: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS.ALL);
    return response.data;
  },

  // ----------------------------------------------------------
  // Update Artist Song
  // PUT /api/songs/:id
  // ----------------------------------------------------------
  updateSong: async (songId, updateData) => {
    const response = await axiosInstance.put(`/songs/${songId}`, updateData);
    return response.data;
  },

  // ----------------------------------------------------------
  // Delete Artist Song
  // DELETE /api/songs/:id
  // ----------------------------------------------------------
  deleteSong: async (songId) => {
    const response = await axiosInstance.delete(`/songs/${songId}`);
    return response.data;
  },

  // ----------------------------------------------------------
  // Upload Artist Song
  // POST /api/songs
  // ----------------------------------------------------------
  uploadSong: async (formData, onProgress) => {
    const response = await axiosInstance.post("/songs", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        if (!onProgress || !progressEvent.total) {
          return;
        }

        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );

        onProgress(progress);
      },
    });

    return response.data;
  },
};

// ============================================================
// Named Exports
// Backward compatibility with existing hooks/components
// ============================================================

export const getArtistStats = artistDashboardApi.getStats;

export const getArtistRecentUploads = artistDashboardApi.getRecentUploads;

export const getArtistNotifications = artistDashboardApi.getNotifications;

export const updateArtistSong = artistDashboardApi.updateSong;

export const deleteArtistSong = artistDashboardApi.deleteSong;

export const uploadArtistSong = artistDashboardApi.uploadSong;

export default artistDashboardApi;