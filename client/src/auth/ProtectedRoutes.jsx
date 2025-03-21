import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import DashboardNavbar from "../Navbar/DashboardNavbar"; // ✅ Import DashboardNavbar

const ProtectedRoute = ({ allowedRole, navbarRole }) => {
    const user = JSON.parse(localStorage.getItem("user")) || null;

    if (!user) return <Navigate to="/login" replace />;
    if (user?.role !== allowedRole) return <Navigate to={`/${user?.role}-dashboard`} replace />;

    return (
        <div className="flex h-screen">  {/* ✅ Ensuring full-page height */}
            {/* Sidebar */}
            <DashboardNavbar role={navbarRole || allowedRole} />  

            {/* Main Content Area */}
            <div className="flex-1 p-6 overflow-auto">  
                <Outlet />
            </div>
        </div>
    );
};

export default ProtectedRoute;
