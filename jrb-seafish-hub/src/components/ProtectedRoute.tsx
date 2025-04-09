// components/ProtectedRoute.tsx
import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import { isTokenExpired } from "../redux/utils/auth";

const ProtectedRoute: React.FC = () => {
  const token = useSelector((state: any) => state.auth.token);
  if (!token || isTokenExpired(token)) {
    return <Navigate to="/adminlogin" replace />; // Redirect to login if expired
  }
  return <Outlet />; // Render protected component
};

export default ProtectedRoute;
