import { useQuery } from '@tanstack/react-query';
import { adminApi } from '../api/adminApi';

const useAdminStats = () => {
  return useQuery({
    queryKey: ['admin', 'dashboard-stats'],
    queryFn: adminApi.getDashboardStats,
    staleTime: 5 * 60 * 1000, // 5 minutes cache
  });
};

const useAdminAnalytics = () => {
  return useQuery({
    queryKey: ['admin', 'analytics-overview'],
    queryFn: adminApi.getAnalyticsOverview,
    staleTime: 5 * 60 * 1000,
  });
};

export { useAdminStats, useAdminAnalytics };
export default {
  useAdminStats,
  useAdminAnalytics,
};