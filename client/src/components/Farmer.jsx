import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import DashboardNavbar from "../Navbar/DashboardNavbar";

const Farmer = () => {
    const navigate = useNavigate();

    const handleNavigation = () => {
        navigate("/contract-farming"); // ✅ Direct navigation
    };

    const handleLogout = () => {
        localStorage.removeItem("user"); // ✅ Clear user data
        navigate("/login"); // ✅ Redirect to login page
    };

    return (<>
        <DashboardNavbar role="farmer" />
        <div className="h-screen flex flex-col items-center justify-center bg-white">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Farmer Dashboard</h1>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={handleNavigation}
                    className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition duration-200"
                >
                    Join Contract Farming
                </button>

                <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-6 py-3 rounded-md hover:bg-red-700 transition duration-200"
                >
                    Logout
                </button>
            </div>

            <Outlet />
        </div>
        </>
    );
};

export default Farmer;
