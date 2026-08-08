import axiosInstance from '@/lib/api/axios';

export const adminApi = {
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/dashboard/stats');
    return response.data;
  },
  
  getAnalyticsOverview: async () => {
    const response = await axiosInstance.get('/analytics/overview');
    return response.data;
  }
};