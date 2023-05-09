import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const PublicRoute = ({ children }) => {
  const isLoggedIn = useAuth();
  return isLoggedIn ? (
    isLoggedIn === "student" ? (
      <Navigate to="/player" />
    ) : (
      <Navigate to="/admin/dashboard" />
    )
  ) : (
    children
  );
};

export default PublicRoute;
