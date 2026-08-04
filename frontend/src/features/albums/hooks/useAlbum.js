import { useQuery } from "@tanstack/react-query";

import { albumService } from "../services/albumService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useAlbum(albumId) {
  return useQuery({
    queryKey: QUERY_KEYS.ALBUM(albumId),

    queryFn: () => albumService.getAlbumById(albumId),

    enabled: Boolean(albumId),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: (failureCount, error) => {
      // Don't retry a 404 (album genuinely doesn't exist) or a 400
      // (malformed id) — only retry on transient/server errors.
      const status = error?.response?.status;
      if (status === 404 || status === 400) return false;
      return failureCount < 1;
    },

    refetchOnWindowFocus: false,
  });
}
