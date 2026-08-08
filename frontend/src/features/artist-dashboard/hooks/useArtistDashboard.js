import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import useAuth from "@/hooks/useAuth";

import {
  artistDashboardApi,
  updateArtistSong,
  deleteArtistSong,
  uploadArtistSong,
} from "../api/artistDashboardApi";

// ---------------------------------------------------------------------------
// Query Hooks
// ---------------------------------------------------------------------------

export const useArtistStats = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["artist-stats", user?._id],
    queryFn: artistDashboardApi.getStats,
    staleTime: 5 * 60 * 1000,
    enabled: Boolean(user?._id),
  });
};

export const useArtistRecentUploads = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["artist-recent-uploads", user?._id],
    queryFn: artistDashboardApi.getRecentUploads,
    enabled: Boolean(user?._id),
  });
};

export const useArtistNotifications = () => {
  const { user } = useAuth();

  return useQuery({
    queryKey: ["artist-notifications", user?._id],
    queryFn: artistDashboardApi.getNotifications,
    enabled: Boolean(user?._id),
  });
};

// ---------------------------------------------------------------------------
// Mutation Hooks
// ---------------------------------------------------------------------------

export const useUpdateArtistSong = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ songId, songData }) =>
      updateArtistSong(songId, songData),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artist-recent-uploads", user?._id],
      });

      queryClient.invalidateQueries({
        queryKey: ["artist-stats", user?._id],
      });
    },
  });
};

export const useDeleteArtistSong = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: (songId) => deleteArtistSong(songId),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artist-recent-uploads", user?._id],
      });

      queryClient.invalidateQueries({
        queryKey: ["artist-stats", user?._id],
      });
    },
  });
};

export const useUploadArtistSong = () => {
  const queryClient = useQueryClient();
  const { user } = useAuth();

  return useMutation({
    mutationFn: ({ formData, onProgress }) =>
      uploadArtistSong(formData, onProgress),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["artist-recent-uploads", user?._id],
      });

      queryClient.invalidateQueries({
        queryKey: ["artist-stats", user?._id],
      });
    },
  });
};

// ---------------------------------------------------------------------------
// Default Export
// ---------------------------------------------------------------------------

export default {
  useArtistStats,
  useArtistRecentUploads,
  useArtistNotifications,
  useUpdateArtistSong,
  useDeleteArtistSong,
  useUploadArtistSong,
};