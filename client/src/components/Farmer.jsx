import React, { useState } from "react";
import { useNavigate, Outlet } from "react-router-dom";

const Farmer = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [profileComplete, setProfileComplete] = useState(null); // Assume profile is complete

    const handleNavigation = () => {
        if (profileComplete === null) return;

        setLoading(true);

        if (profileComplete) {
            navigate("contract-farming"); // ✅ Use Relative Path
        } else {
            navigate("/farmer-onboarding"); // ❌ Redirect to Profile Completion if Incomplete
        }

        setLoading(false);
    };

    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-3xl font-bold text-gray-800 mb-6">Farmer Dashboard</h1>

            <div className="grid grid-cols-2 gap-4">
                <button
                    onClick={handleNavigation}
                    className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700"
                    disabled={loading || profileComplete === null}
                >
                    {loading ? "Checking..." : "Join Contract Farming"}
                </button>
            </div>

            <Outlet /> {/* ✅ Allows nested components (like Contract Farming) to render here */}
        </div>
    );
};

export default Farmer;
