import axiosInstance from '@/lib/api/axios';
import { API_ENDPOINTS } from '@/constants/apiEndpoints';

export const artistDashboardApi = {
  getStats: async () => {
    const response = await axiosInstance.get(API_ENDPOINTS.DASHBOARD.STATS);
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