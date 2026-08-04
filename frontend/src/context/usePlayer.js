import { usePlayerContext } from "./PlayerContext";

export function usePlayer() {
  return usePlayerContext();
}

export default usePlayer;