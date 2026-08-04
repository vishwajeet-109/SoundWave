import { useQuery } from "@tanstack/react-query";

import { getAlbums } from "../api/homeApi";

export function useAlbums() {
  return useQuery({
    queryKey: ["home", "albums"],
    queryFn: () => getAlbums(),
  });
}
