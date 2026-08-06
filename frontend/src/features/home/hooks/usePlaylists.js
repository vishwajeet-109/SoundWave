import { useQuery } from "@tanstack/react-query";

import playlistService from "@/services/playlistService";

export function usePlaylists(params = {}) {
  return useQuery({
    queryKey: ["playlists", params],

    queryFn: async () => {
      const { data } = await playlistService.getAll(params);

      return data.data;
    },

    staleTime: 1000 * 60 * 5,
  });
}