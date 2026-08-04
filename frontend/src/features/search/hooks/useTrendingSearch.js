import { useQuery } from "@tanstack/react-query";

import { searchService } from "../services/searchService";

import { QUERY_KEYS } from "@/constants/queryKeys";

export function useTrendingSearch() {

  return useQuery({

    queryKey: [QUERY_KEYS.TRENDING_SEARCH],

    queryFn: searchService.trending,

    staleTime: 1000 * 60 * 10,

  });

}