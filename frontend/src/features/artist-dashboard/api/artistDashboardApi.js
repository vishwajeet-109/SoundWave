import axiosInstance from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const artistDashboardApi = {
  getStats: async () => {
    // Use the artist-specific dashboard endpoint. The admin `stats` endpoint
    // requires admin/super_admin roles and caused artists to receive a 403,
    // which produced the ErrorState in the Artist Dashboard. Use the
    // artist-only route to fetch artist dashboard data.
    const response = await axiosInstance.get('/dashboard/artist');
    return response.data;
  },
  getRecentUploads: async (artistId) => {
    const response = await axiosInstance.get(`/songs?artist=${artistId}&limit=5&sort=-createdAt`);
    return response.data;
  },
  getNotifications: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.NOTIFICATIONS.ALL);
    return response.data;
  }
};