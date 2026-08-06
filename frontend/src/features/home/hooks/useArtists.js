import { useQuery } from "@tanstack/react-query";

import artistService from "@/services/artistService";

export function useArtists(params = {}) {
  return useQuery({
    queryKey: ["artists", params],

    queryFn: async () => {
      const { data } = await artistService.getAll(params);

      return data.data;
    },

    staleTime: 1000 * 60 * 5,
  });
}