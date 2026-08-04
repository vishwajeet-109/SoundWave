import { useQuery } from "@tanstack/react-query";

import { getPlaylists } from "../api/homeApi";

export function usePlaylists() {
  return useQuery({
    queryKey: ["home", "playlists"],
    queryFn: () => getPlaylists(),
  });
}
