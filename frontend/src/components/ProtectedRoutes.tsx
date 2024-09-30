import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../context/authContext";

interface ProtectedRouteProps {
  element: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ element }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div></div>; 
  }

  return isAuthenticated ? <>{element}</> : <Navigate to="/login" />;
};

export default ProtectedRoute;
