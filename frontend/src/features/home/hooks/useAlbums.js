import { useQuery } from "@tanstack/react-query";

import albumService from "@/services/albumService";

function useAlbums(params = {}) {
  return useQuery({
    queryKey: ["albums", params],

    queryFn: async () => {
      const { data } = await albumService.getAll(params);

      return data.data;
    },

    staleTime: 1000 * 60 * 5,
  });
}

export { useAlbums };
export default useAlbums;