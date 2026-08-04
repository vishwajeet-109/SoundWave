import { useQuery } from "@tanstack/react-query";

import { getSongs } from "../api/homeApi";

export function useSongs() {
  return useQuery({
    queryKey: ["home", "songs"],
    queryFn: () => getSongs(),
  });
}
