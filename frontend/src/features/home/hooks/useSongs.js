import { useQuery } from "@tanstack/react-query";

import songService from "@/services/songService";

function useSongs(params = {}) {
  return useQuery({
    queryKey: ["songs", params],

    queryFn: async () => {
      const { data } = await songService.getAll(params);

      return data.data;
    },

    staleTime: 1000 * 60 * 5,
  });
}

export { useSongs };
export default useSongs;