import { useQuery } from "@tanstack/react-query";

import { getArtists } from "../api/homeApi";

export function useArtists() {
  return useQuery({
    queryKey: ["home", "artists"],
    queryFn: () => getArtists(),
  });
}
