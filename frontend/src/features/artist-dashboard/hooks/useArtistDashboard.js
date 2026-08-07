import { useQuery } from '@tanstack/react-query';
import { artistDashboardApi } from '../api/artistDashboardApi';
import { useAuth } from '@/hooks/useAuth';

export const useArtistStats = () => {
  return useQuery({
    queryKey: ['artist-stats'],
    queryFn: artistDashboardApi.getStats,
    staleTime: 5 * 60 * 1000,
  });
};

export const useArtistRecentUploads = () => {
  const { user } = useAuth();
  return useQuery({
    queryKey: ['artist-recent-uploads', user?._id],
    queryFn: () => artistDashboardApi.getRecentUploads(user?._id),
    enabled: !!user?._id,
  });
};

export const useArtistNotifications = () => {
  return useQuery({
    queryKey: ['artist-notifications'],
    queryFn: artistDashboardApi.getNotifications,
  });
};