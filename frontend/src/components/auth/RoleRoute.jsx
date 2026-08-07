import { Navigate, Outlet } from "react-router-dom";
import useAuth from "@/hooks/useAuth";

export default function RoleRoute({
  roles = [],
}) {
  const { user } = useAuth();

  // User not loaded yet
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Check role
  if (!roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}
export { RoleRoute };
