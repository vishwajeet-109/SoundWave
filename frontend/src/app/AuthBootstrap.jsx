import { useEffect } from "react";
import useAuth from "@/hooks/useAuth";

export default function AuthBootstrap({ children }) {
  const {
    accessToken,
    fetchCurrentUser,
    initialized,
  } = useAuth();

  useEffect(() => {
    if (accessToken) {
      fetchCurrentUser();
    }
  }, [accessToken, fetchCurrentUser]);

  if (!initialized && accessToken) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-green-500" />
      </div>
    );
  }

  return children;
}