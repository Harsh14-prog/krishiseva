import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React from "react";

const MentorProfile = () => {
  const [mentorData, setMentorData] = useState({
    name: "",
    experience: "",
    expertise: "",
    contact: "",
  });

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")); // ✅ Get full user object
  const userId = user?._id; // ✅ Extract _id (userId)

  // Redirect to login if user is missing
  useEffect(() => {
    if (!userId) {
      console.error("User not found. Redirecting to login...");
      alert("You need to log in first.");
      navigate("/login");
    }
  }, [userId, navigate]);

  const handleChange = (e) => {
    setMentorData({ ...mentorData, [e.target.name]: e.target.value.trim() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Ensure all fields are filled
    if (!mentorData.name || !mentorData.experience || !mentorData.expertise || !mentorData.contact) {
      alert("Please fill in all fields.");
      return;
    }

    console.log("Mentor Data Sent:", mentorData);
    console.log("User ID:", userId);

    try {
      const response = await axios.post("http://localhost:8080/api/mentors/create", {
        ...mentorData,
        userId, // ✅ Ensure userId is sent
      });

      console.log("Response:", response.data);
      navigate("/mentor-dashboard/create-room");
    } catch (error) {
      console.error("Error creating mentor profile:", error.response?.data || error);
      alert(error.response?.data?.error || "An error occurred while creating the profile.");
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold">Create Mentor Profile</h2>
      <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
        <input type="text" name="name" placeholder="Full Name" value={mentorData.name} onChange={handleChange} className="border p-2" required />
        <input type="text" name="experience" placeholder="Years of Experience" value={mentorData.experience} onChange={handleChange} className="border p-2" required />
        <input type="text" name="expertise" placeholder="Expertise (e.g., Organic Farming)" value={mentorData.expertise} onChange={handleChange} className="border p-2" required />
        <input type="text" name="contact" placeholder="Contact Information" value={mentorData.contact} onChange={handleChange} className="border p-2" required />
        <button type="submit" className="bg-emerald-600 text-white p-2 rounded">Submit</button>
      </form>
    </div>
  );
};

export default MentorProfile;
