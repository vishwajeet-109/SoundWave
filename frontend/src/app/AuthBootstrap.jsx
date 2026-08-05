import { useEffect } from "react";

import useAuth from "@/hooks/useAuth";

export default function AuthBootstrap({ children }) {
  const {
    initialize,
    initialized,
  } = useAuth();

  useEffect(() => {
    initialize();
  }, [initialize]);

  if (!initialized) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-zinc-950 text-white">
        <div className="flex flex-col items-center gap-4">
          <div className="h-12 w-12 animate-spin rounded-full border-4 border-zinc-700 border-t-green-500" />

          <h2 className="text-lg font-semibold">
            Loading SoundWave...
          </h2>

          <p className="text-sm text-zinc-500">
            Preparing your music experience
          </p>
        </div>
      </div>
    );
  }

  return children;
}