import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Mentor = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // ✅ Get full user object
  const userId = user?._id; // ✅ Extract userId

  // Redirect to login if no user is found
  useEffect(() => {
    if (!userId) {
      console.error("User not found. Redirecting to login...");
      alert("You need to log in first.");
      navigate("/login");
    }
  }, [userId, navigate]);

  const handleLogout = () => {
    localStorage.removeItem("user"); // ✅ Clear user data
    navigate("/login"); // ✅ Redirect to login
  };

  const handleCreateRoom = async () => {
    try {
      // ✅ Check if mentor profile exists
      const response = await axios.get(`http://localhost:8080/api/mentors/check-profile/${userId}`);

      if (response.data.exists) {
        navigate("/mentor-dashboard/create-room"); // ✅ Go to Create Room if profile exists
      } else {
        alert("You need to create a mentor profile first!");
        navigate("/mentor-dashboard/mentor-profile"); // Redirect to Create Profile page
      }
    } catch (error) {
      console.error("Error checking mentor profile:", error);
      alert("Something went wrong while checking your profile.");
    }
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
