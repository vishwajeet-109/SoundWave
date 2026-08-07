import { useQuery } from "@tanstack/react-query";

import { searchService } from "../services/searchService";

import { QUERY_KEYS } from "@/constants/queryKeys";

function useSearch(params) {

  return useQuery({

    queryKey: QUERY_KEYS.SEARCH(params),

    queryFn: () => searchService.search(params),

    enabled: Boolean(params.q),

    staleTime: 1000 * 60 * 5,

    gcTime: 1000 * 60 * 10,

    retry: 1,

    refetchOnWindowFocus: false,

  });

}