import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../Navbar/DashboardNavbar";

const Mentor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  return (<>
  <DashboardNavbar role="mentor" />
    <div className="h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
      <button 
        onClick={handleLogout} 
        className="bg-red-500 text-white px-4 py-2 rounded"
      >
        Logout
      </button>
    </div></>
  );
};

export default Mentor;
