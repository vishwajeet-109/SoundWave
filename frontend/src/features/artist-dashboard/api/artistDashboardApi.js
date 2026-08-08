import axiosInstance from "@/lib/api/axios";
import { API_ENDPOINTS } from "@/constants/apiEndpoints";

export const artistDashboardApi = {
  // Artist Dashboard Stats
  getStats: async () => {
    const response = await axiosInstance.get("/dashboard/artist");
    return response.data;
  },

  // Recent Uploads
  getRecentUploads: async () => {
    const response = await axiosInstance.get("/songs/my-songs");
    return response.data;
  },

  // Notifications
  getNotifications: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS.ALL);
    return response.data;
  },

  // Update Artist Song
  updateSong: async (songId, updateData) => {
    const response = await axiosInstance.put(`/songs/${songId}`, updateData);
    return response.data;
  },

  // Delete Artist Song
  deleteSong: async (songId) => {
    const response = await axiosInstance.delete(`/songs/${songId}`);
    return response.data;
  },
};

// Named exports for backward compatibility
export const {
  updateSong: updateArtistSong,
  deleteSong: deleteArtistSong,
} = artistDashboardApi;