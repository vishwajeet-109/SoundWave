import React from "react";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const isAuthenticated = !!token;
  
  // 👈 Yahan .toLowerCase() laga diya hai taaki 'ADMIN' aur 'admin' dono match ho jayein
  const userRole = user?.role?.toLowerCase();
  const isAdmin = userRole === "admin" || userRole === "super_admin" || userRole === "moderator";

  if (!isAuthenticated || !isAdmin) {
    return <Navigate to="/" replace />;
  }

  return children;
}