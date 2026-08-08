import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  artistDashboardApi,
  updateArtistSong,
  deleteArtistSong,
} from '../api/artistDashboardApi';
import useAuth from '@/hooks/useAuth';

// ---------------------------------------------------------------------------
// Query Hooks
// ---------------------------------------------------------------------------

export const useArtistStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ['artist-stats', user?._id],
    queryFn: () => artistDashboardApi.getStats(),
    staleTime: 5 * 60 * 1000,
    enabled: !!user?._id,
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
  const { user } = useAuth();

  return useQuery({
    queryKey: ['artist-notifications', user?._id],
    queryFn: () => artistDashboardApi.getNotifications(),
    enabled: !!user?._id,
  });
};

// ---------------------------------------------------------------------------
// Mutation Hooks (Song CRUD & Auto Cache Invalidation)
// ---------------------------------------------------------------------------

export const useUpdateArtistSong = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ songId, songData }) => updateArtistSong(songId, songData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist-recent-uploads', user?._id] });
      queryClient.invalidateQueries({ queryKey: ['artist-stats', user?._id] });
    },
  });
};

export const useDeleteArtistSong = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (songId) => deleteArtistSong(songId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['artist-recent-uploads', user?._id] });
      queryClient.invalidateQueries({ queryKey: ['artist-stats', user?._id] });
    },
  });
};

export default {
  useArtistStats,
  useArtistRecentUploads,
  useArtistNotifications,
  useUpdateArtistSong,
  useDeleteArtistSong,
};