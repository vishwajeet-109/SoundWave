import { useQuery } from "@tanstack/react-query";

import { getHistory } from "../api/homeApi";

export function useHistory(options = {}) {
  return useQuery({
    queryKey: ["home", "history"],
    queryFn: () => getHistory(),
    enabled: options.enabled ?? true,
    retry: false,
  });
}