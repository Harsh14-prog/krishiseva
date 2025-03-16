import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import DashboardNavbar from "../Navbar/DashboardNavbar"; // ✅ Import DashboardNavbar

const ProtectedRoute = ({ allowedRole , navbarRole }) => {
    const user = JSON.parse(localStorage.getItem("user")) || null;

    if (!user) return <Navigate to="/login" replace />;
    if (user?.role !== allowedRole) return <Navigate to={`/${user?.role}-dashboard`} replace />;

    return (
        <div className="flex">
            <DashboardNavbar role={navbarRole || allowedRole} />  
            <div className="flex-1 p-4">  {/* ✅ Main content area */}
                <Outlet />
            </div>
        </div>
    );
};

export default ProtectedRoute;
