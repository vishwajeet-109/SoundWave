import { useQuery } from "@tanstack/react-query";

import { getHistory } from "../api/homeApi";

export function useHistory() {
  return useQuery({
    queryKey: ["home", "history"],
    queryFn: () => getHistory(),
  });
}
