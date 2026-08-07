import axiosInstance from '@/lib/api/axios';

export const adminApi = {
  getDashboardStats: async () => {
    // Verified endpoint from backend/routes/dashboardRoutes.js
    const response = await axiosInstance.get('/api/v1/dashboard/stats');
    return response.data;
  },
  
  getAnalyticsOverview: async () => {
    // Verified endpoint from backend/routes/analyticsRoutes.js
    const response = await axiosInstance.get('/api/v1/analytics/overview');
    return response.data;
  }
};