import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { Loader2 } from 'lucide-react';

const RoleRoute = ({ allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();

  // Prevent premature redirects while auth state is resolving
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-zinc-950">
        <Loader2 className="w-8 h-8 animate-spin text-green-500" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace />;
  }

  if (!allowedRoles.includes(user?.role)) {
    // If an Admin tries to access a restricted User route, send them back to Admin dashboard
    if (user?.role === 'admin' || user?.role === 'super_admin' || user?.role === 'moderator') {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    }
    // If an Artist tries to access a restricted User route
    if (user?.role === 'artist') {
      return <Navigate to={ROUTES.ARTIST_DASHBOARD} replace />;
    }
    // Default unauthorized user redirect
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;