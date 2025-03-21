import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Home as HomeIcon,
  AddBox as AddBoxIcon,
  PeopleAlt as PeopleAltIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  MenuBook as MenuBookIcon,
  MeetingRoom as MeetingRoomIcon,
  Event as EventIcon,
  ContactMail as ContactMailIcon,
  TrackChanges as TrackChangesIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
} from "@mui/icons-material";

const DashboardNavbar = ({ role, children }) => {
  const [isOpen, setIsOpen] = useState(true);
  const navigate = useNavigate();

  const handleNavigation = (path) => navigate(path);

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload(); // Refresh the page after logout
  };

  const menuItems = {
    farmer: [
      { path: "/farmer-dashboard", label: "Home", icon: <HomeIcon /> },
      { path: "/farmer-dashboard/farmer-onboarding", label: "Onboarding", icon: <AddBoxIcon /> },
      { path: "/contract-farming", label: "Contract Farming", icon: <PeopleAltIcon /> },
      { path: "/farmer-profile", label: "Profile", icon: <PersonIcon /> },
    ],
    contractFarming: [
      { path: "/contract-farming", label: "Explore Mentor Plans", icon: <MenuBookIcon /> },
      { path: "/joined-rooms", label: "Joined Rooms", icon: <MeetingRoomIcon /> },
      { path: "/my-meetings", label: "My Meetings", icon: <EventIcon /> },
      { path: "/meeting-calendar", label: "Meeting Calendar", icon: <EventIcon /> },
      { path: "/meeting-history", label: "Meeting History", icon: <MenuBookIcon /> },
      { path: "/request-mentor", label: "Request a Mentor", icon: <ContactMailIcon /> },
      { path: "/progress-tracker", label: "Progress Tracker", icon: <TrackChangesIcon /> },
      { path: "/set-reminders", label: "Set Reminders", icon: <NotificationsIcon /> },
      { path: "/notifications", label: "Notifications & Alerts", icon: <NotificationsIcon /> },
      { path: "/settings", label: "Settings", icon: <SettingsIcon /> },
    ],
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className={`transition-all duration-300 bg-zinc-100 text-gray-900 shadow-lg h-screen ${isOpen ? "w-64" : "w-16"}`}>
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-4 border-b border-gray-300">
          {isOpen && <h1 className="text-2xl font-bold text-green-700">KrishiSeva</h1>}
          <button className="text-xl text-green-700" onClick={() => setIsOpen(!isOpen)}>
            {isOpen ? "<<" : ">>"}
          </button>
        </div>

        {/* Navigation Items */}
        <ul className="mt-6 space-y-4">
          {menuItems[role]?.map((item, index) => (
            <li
              key={index}
              className="flex items-center p-2 cursor-pointer hover:bg-green-200 rounded transition-all duration-200"
              onClick={() => handleNavigation(item.path)}
            >
              {item.icon}
              {isOpen && <span className="ml-4">{item.label}</span>}
            </li>
          ))}
          {/* Logout Button */}
          <li
            className="flex items-center cursor-pointer text-red-500 hover:bg-red-200 p-2 rounded transition-all duration-200"
            onClick={handleLogout}
          >
            <LogoutIcon />
            {isOpen && <span className="ml-4">Sign Out</span>}
          </li>
        </ul>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-auto ">{children}</div>
    </div>
  );
};

export default DashboardNavbar;
