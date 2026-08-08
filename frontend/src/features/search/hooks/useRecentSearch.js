import { useQuery } from "@tanstack/react-query";

import { searchService } from "../services/searchService";

import { QUERY_KEYS } from "@/constants/queryKeys";

function useRecentSearch() {

  return useQuery({

    queryKey: [QUERY_KEYS.RECENT_SEARCH],

    queryFn: searchService.recent,

  });

}

export { useRecentSearch };
export default useRecentSearch;