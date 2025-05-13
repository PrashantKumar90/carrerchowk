// utils/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // If no token, redirect to login page
    return <Navigate to="/" replace />;
  }

  // If token exists, render the children component (protected route)
  return children;
};

export default PrivateRoute;
