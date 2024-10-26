// ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useStateProvider } from "../lib/stateContext";

const ProtectedRoute = ({ children }) => {
  const [{ userInformation }] = useStateProvider();

  // Check if the user is logged in
  if (!userInformation) {
    return <Navigate to="/login" />;
  }

  // Render children if the user is authenticated
  return children;
};

export default ProtectedRoute;
