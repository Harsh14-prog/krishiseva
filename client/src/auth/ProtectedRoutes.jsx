import React from "react";
import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = ({ allowedRole }) => {
    // Get user data safely from localStorage
    const user = JSON.parse(localStorage.getItem("user")) || null;

    if (!user) return <Navigate to="/login" replace />; // Redirect if not logged in
    if (user?.role !== allowedRole) return <Navigate to={`/${user?.role}-dashboard`} replace />; // Redirect based on role

    return <Outlet />; // Render child routes
};

export default ProtectedRoute;
