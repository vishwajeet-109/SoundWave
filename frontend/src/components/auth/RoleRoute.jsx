import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import useAuth from '@/hooks/useAuth';
import { ROUTES } from '@/constants/routes';
import { Loader2 } from 'lucide-react';

const normalizeRole = (value) => String(value ?? '').trim().toUpperCase();

const RoleRoute = ({ allowedRoles = [] }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const normalizedUserRole = normalizeRole(user?.role);
  const normalizedAllowedRoles = allowedRoles.map(normalizeRole);

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

  if (!normalizedAllowedRoles.includes(normalizedUserRole)) {
    if (['ADMIN', 'SUPER_ADMIN'].includes(normalizedUserRole)) {
      return <Navigate to={ROUTES.ADMIN_DASHBOARD} replace />;
    }

    if (normalizedUserRole === 'ARTIST') {
      return <Navigate to={ROUTES.ARTIST} replace />;
    }

    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <Outlet />;
};

export default RoleRoute;