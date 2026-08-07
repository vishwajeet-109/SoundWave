import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { approvalApi } from '../api/approvalApi';

const usePendingSongs = () => {
  return useQuery({
    queryKey: ['admin', 'pending-songs'],
    queryFn: approvalApi.getPendingSongs,
    staleTime: 2 * 60 * 1000, // Refresh frequently for moderation
  });
};

const useApproveSong = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: approvalApi.approveSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pending-songs'] });
      // Invalidate public songs so approved tracks appear immediately
      queryClient.invalidateQueries({ queryKey: ['library'] }); 
    },
  });
};

const useRejectSong = () => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: approvalApi.rejectSong,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'pending-songs'] });
    },
  });
};

export { usePendingSongs, useApproveSong, useRejectSong };

export default {
  usePendingSongs,
  useApproveSong,
  useRejectSong,
};