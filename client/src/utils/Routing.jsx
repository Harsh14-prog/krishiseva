import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "../auth/Signup";
import Login from "../auth/Login";
import Home from "../components/Home";
import Farmer from "../components/Farmer";
import Mentor from "../components/Mentor";
import Exporter from "../components/Exporter";
import FarmerOnboarding from "../pages/FarmerOnboarding";
import ContractFarming from "../components/ContractFarming";
import ProtectedRoute from "../auth/ProtectedRoutes";
import CreateRoom from "../pages/CreateRoom";
import ExploreMentorPlans from "../Template/ExploreMentorPlans";
import MentorProfile from "../pages/MentorProfile"; // ✅ Import Mentor Profile Page

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },

  // ✅ Farmer Dashboard
  {
    path: "/farmer-dashboard",
    element: <ProtectedRoute allowedRole="farmer" navbarRole="farmer"/>,
    children: [
      { index: true, element: <Farmer /> },
      { path: "farmer-onboarding", element: <FarmerOnboarding /> },
    ],
  },

  // ✅ Contract Farming
  {
    path: "/contract-farming",
    element: <ProtectedRoute allowedRole="farmer" navbarRole="contractFarming"/> ,
    children: [{ index: true, element: <ExploreMentorPlans /> }],
  },

  // ✅ Mentor Dashboard
  {
    path: "/mentor-dashboard",
    element: <ProtectedRoute allowedRole="mentor" navbarRole="mentor" />,
    children: [
      { index: true, element: <Mentor /> },
      { path: "create-room", element: <CreateRoom /> }, // ✅ Create Room Page
      { path: "mentor-profile", element: <MentorProfile /> }, // ✅ Mentor Profile Page
    ],
  },

  // ✅ Exporter Dashboard
  {
    path: "/exporter-dashboard",
    element: <ProtectedRoute allowedRole="exporter" navbarRole="exporter"/>,
    children: [{ index: true, element: <Exporter /> }],
  },
]);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;
