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
import ProtectedRoute from "../auth/ProtectedRoutes"; // ✅ Import Protected Route
import CreateRoom from "../pages/CreateRoom"; // ✅ Import CreateRoom component

const router = createBrowserRouter([
  { path: "/", element: <Home /> },
  { path: "/signup", element: <Signup /> },
  { path: "/login", element: <Login /> },

  // ✅ Farmer Dashboard (Parent Route)
  {
    path: "/farmer-dashboard",
    element: <ProtectedRoute allowedRole="farmer" />, // ✅ Correct usage
    children: [
      { index: true, element: <Farmer /> }, // ✅ Default dashboard view
      { path: "farmer-onboarding", element: <FarmerOnboarding /> }, // ✅ Nested route
    ],
  },

  // ✅ Contract Farming (Separate Dashboard)
  {
    path: "/contract-farming",
    element: <ProtectedRoute allowedRole="farmer" />,
    children: [{ index: true, element: <ContractFarming /> }],
  },

  // ✅ Mentor Dashboard
  {
    path: "/mentor-dashboard",
    element: <ProtectedRoute allowedRole="mentor" />,
    children: [
      { index: true, element: <Mentor /> }, // ✅ Mentor Dashboard
      { path: "create-room", element: <CreateRoom /> }, // ✅ Create Room Page
    ],
  },

  // ✅ Exporter Dashboard
  {
    path: "/exporter-dashboard",
    element: <ProtectedRoute allowedRole="exporter" />,
    children: [{ index: true, element: <Exporter /> }],
  },
]);

const Routing = () => {
  return <RouterProvider router={router} />;
};

export default Routing;
