import { useMemo } from "react";
import { useMediaCardBase } from "./useMediaCardBase";

const PLACEHOLDER =
  "https://placehold.co/500x500/18181b/ffffff?text=Artist";

export function useArtistCard({ artist, onPlay }) {
  const artistName = useMemo(() => artist?.name || "Unknown Artist", [artist]);

  const monthlyListeners = useMemo(() => artist?.monthlyListeners || null, [artist]);

  const followers = useMemo(() => artist?.followers || null, [artist]);

  const baseCard = useMediaCardBase({
    item: artist,
    itemType: "artist",
    placeholder: PLACEHOLDER,
    navigatePath: (item) => (item?._id ? `/artists/${item._id}` : "/"),
    onPlay,
    playlist: [],
    getPrimarySong: () => null,
  });

  return {
    image: baseCard.image,
    artistName,
    monthlyListeners,
    followers,
    handleNavigate: baseCard.handleNavigate,
    handlePlay: baseCard.handlePlay,
  };
}
