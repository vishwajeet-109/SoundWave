import { useQuery } from '@tanstack/react-query';
import { artistDashboardApi } from '../api/artistDashboardApi';
import useAuth from '@/hooks/useAuth';

const useArtistStats = () => {
  return useQuery({
    queryKey: ['artist-stats'],
    queryFn: artistDashboardApi.getStats,
    staleTime: 5 * 60 * 1000,
  });
};

const useArtistRecentUploads = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['artist-recent-uploads', user?._id],
    queryFn: () => artistDashboardApi.getRecentUploads(user?._id),
    enabled: !!user?._id,
  });
};

const useArtistNotifications = () => {
  return useQuery({
    queryKey: ['artist-notifications'],
    queryFn: artistDashboardApi.getNotifications,
  });
};

export { useArtistStats, useArtistRecentUploads, useArtistNotifications };
export default {
  useArtistStats,
  useArtistRecentUploads,
  useArtistNotifications,
};