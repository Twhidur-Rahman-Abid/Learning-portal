import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const AdminRoute = ({ children }) => {
  const isAuth = useAuth();
  return isAuth === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
