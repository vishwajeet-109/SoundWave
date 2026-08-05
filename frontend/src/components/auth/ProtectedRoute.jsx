import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function ProtectedRoute() {
  const {
    initialized,
    isAuthenticated,
  } = useAuth();

  if (!initialized) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background">
      <div className="h-10 w-10 animate-spin rounded-full border-4 border-zinc-700 border-t-green-500" />
    </div>
  );
}

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}