import { useQuery } from "@tanstack/react-query";
import libraryService from "../services/libraryService";

export function useLibrary(options = {}) {
  return useQuery({
    queryKey: ["library"],

    queryFn: async () => {
      return await libraryService.getLibrary();
    },

    staleTime: 1000 * 60 * 5,
    gcTime: 1000 * 60 * 30,
    retry: 1,
    refetchOnWindowFocus: false,

    ...options,
  });
}

export default useLibrary;