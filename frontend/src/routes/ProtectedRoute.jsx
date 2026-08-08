import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import useAuthStore from "../store/authStore";

// 1. Root Guard: Handle default '/' URL entry strictly by role
export function RootIndexRedirect() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  const userRole = user?.role?.toLowerCase();

  if (userRole === "artist") {
    return <Navigate to="/artist" replace />;
  }

  return null;
}

// 2. Strict Protected Route Guard (Fixed with Case-Insensitive Role Checking)
export function ProtectedRoute({ allowedRole }) {
  const { isAuthenticated, user, isLoading } = useAuthStore();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Agar user data abhi load ho raha hai, toh turant redirect mat karo, loader dikhao
  if (!user) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-zinc-400 text-sm">
        Loading workspace...
      </div>
    );
  }

  // Role ko lowercase karke compare karo taaki capital/small letter ki error na aaye
  const userRole = user?.role?.toLowerCase();
  const targetRole = allowedRole?.toLowerCase();

  if (targetRole && userRole !== targetRole) {
    return <Navigate to={userRole === "artist" ? "/artist" : "/"} replace />;
  }

  return <Outlet />;
}

// 3. Dynamic Fallback Guard for unknown URLs
export function DynamicFallback() {
  const { isAuthenticated, user } = useAuthStore();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  
  const userRole = user?.role?.toLowerCase();
  return <Navigate to={userRole === "artist" ? "/artist" : "/"} replace />;
}