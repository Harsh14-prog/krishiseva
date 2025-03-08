import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../Navbar/DashboardNavbar"; // Importing the navbar component

const Exporter = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar/Navbar */}
      <DashboardNavbar role="exporter" />

      {/* Main Content */}
      <div className="flex-1 flex flex-col items-center justify-center space-y-4">
        <h1 className="text-3xl font-bold">Exporter Dashboard</h1>
        <button 
          onClick={handleLogout} 
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Exporter;
