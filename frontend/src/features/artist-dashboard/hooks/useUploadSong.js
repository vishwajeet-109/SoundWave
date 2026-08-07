import { useMutation, useQueryClient } from '@tanstack/react-query';
import { uploadApi } from '../api/uploadApi';

export const useUploadSong = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: uploadApi.uploadSong,
    onSuccess: () => {
      // Refresh the artist dashboard data automatically after a successful upload
      queryClient.invalidateQueries({ queryKey: ['artist-recent-uploads'] });
      queryClient.invalidateQueries({ queryKey: ['artist-stats'] });
      queryClient.invalidateQueries({ queryKey: ['library'] });
    },
  });
};