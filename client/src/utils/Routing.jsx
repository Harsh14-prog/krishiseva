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

const router = createBrowserRouter([
    { path: "/", element: <Home /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },

    // ✅ Farmer Dashboard with Nested Routes
    {
        path: "/farmer-dashboard",
        element: <Farmer />, // ✅ Farmer Page as Layout
        children: [
            { path: "contract-farming", element: <ContractFarming /> }, // ✅ Relative Path for Nested Route
        ],
    },

    { path: "/farmer-onboarding", element: <FarmerOnboarding /> },

    { path: "/mentor-dashboard", element: <Mentor /> },
    { path: "/exporter-dashboard", element: <Exporter /> },
]);

const Routing = () => {
    return <RouterProvider router={router} />;
};

export default Routing;
