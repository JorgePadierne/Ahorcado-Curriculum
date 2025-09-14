import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

interface ProtectedRouteprops {
  children: React.ReactElement;
}

const ProtectedRoute: React.FC<ProtectedRouteprops> = ({ children }) => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }
  return children;
};
export default ProtectedRoute;
