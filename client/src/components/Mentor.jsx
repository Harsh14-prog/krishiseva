import React from "react";
import { useNavigate } from "react-router-dom";
import DashboardNavbar from "../Navbar/DashboardNavbar";

const Mentor = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user"); // Clear user data
    navigate("/login"); // Redirect to login page
  };

  const handleCreateRoom = () => {
    navigate("/mentor-dashboard/create-room"); // Navigate to the room creation form
  };

  return (
    <>
      
      <div className="h-screen flex flex-col items-center justify-center space-y-6">
        <h1 className="text-3xl font-bold">Mentor Dashboard</h1>
        
        <div className="flex space-x-4">
          <button 
            onClick={handleCreateRoom} 
            className="bg-emerald-600 text-white px-6 py-2 rounded shadow-md hover:bg-emerald-700"
          >
            Create Room
          </button>
          
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-6 py-2 rounded shadow-md hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Mentor;
