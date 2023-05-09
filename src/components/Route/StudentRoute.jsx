import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const StudentRoute = ({ children }) => {
  const isAuth = useAuth();
  return isAuth === "student" ? children : <Navigate to="/" />;
};

export default StudentRoute;
