import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import AddBoxIcon from "@mui/icons-material/AddBox";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";

const DashboardNavbar = ({ role }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  // Define navigation links based on user role
  const menuItems = {
    farmer: [
      { path: "/farmer-dashboard", label: "Home", icon: <HomeIcon /> },
      { path: "/farmer-onboarding", label: "Onboarding", icon: <AddBoxIcon /> },
      { path: "/contract-farming", label: "Contract Farming", icon: <PeopleAltIcon /> },
      { path: "/farmer-profile", label: "Profile", icon: <PersonIcon /> },
    ],
    mentor: [
      { path: "/mentor-dashboard", label: "Home", icon: <HomeIcon /> },
      { path: "/mentor-profile", label: "Profile", icon: <PersonIcon /> },
    ],
    exporter: [
      { path: "/exporter-dashboard", label: "Home", icon: <HomeIcon /> },
      { path: "/exporter-profile", label: "Profile", icon: <PersonIcon /> },
    ],
    
  };

  return (
    <div className="flex h-screen fixed">
      {/* Sidebar */}
      <div className={`bg-gray-100 h-full transition-all duration-300 ${isOpen ? "w-64" : "w-18"}`}>
        <div className="flex justify-between items-center p-4 border-b">
          {isOpen && <h1 className="text-3xl text-green-600 font-bold">KrishiSeva</h1>}
          <button className="text-3xl font-extrabold" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "<<" : ">>"}
          </button>
        </div>

        {/* Navigation Items */}
        <ul className="mt-6 space-y-4">
          {menuItems[role]?.map((item, index) => (
            <li
              key={index}
              className={`flex items-center cursor-pointer hover:bg-gray-300 p-2 rounded ${
                isOpen ? "justify-start" : "justify-center"
              }`}
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              {isOpen && <span className="ml-4 text-xl">{item.label}</span>}
            </li>
          ))}
          {/* Logout Button */}
          <li
            className={`flex items-center cursor-pointer text-red-500 hover:bg-gray-300 p-2 rounded ${
              isOpen ? "justify-start" : "justify-center"
            }`}
            onClick={handleLogout}
          >
            <LogoutIcon />
            {isOpen && <span className="ml-4 text-xl text-red-500">Sign Out</span>}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default DashboardNavbar;
