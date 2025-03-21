import React from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";

// ✅ Validation Schema
const schema = yup.object().shape({
    fullName: yup.string().required("Full Name is required"),
    mobile: yup.string().matches(/^[0-9]{10}$/, "Enter a valid 10-digit mobile number").required("Mobile number is required"),
    aadhaar: yup.string().matches(/^[0-9]{12}$/, "Enter a valid 12-digit Aadhaar Number").required("Aadhaar number is required"),
    gender: yup.string().oneOf(["Male", "Female", "Other"]).required("Gender is required"),
    language: yup.string().oneOf(["Hindi", "Marathi", "English"]).required("Select your preferred language"),
});

const FarmerOnboarding = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // ✅ Handle Profile Submission
    const onSubmit = async (data) => {
        try {
            const profileData = {
                ...data,
                profileCompleted: true, // ✅ Added this field to mark profile as complete
            };

            await axios.post("/api/farmers/create-profile", profileData, {
                headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
            });

            alert("Profile created successfully!");
            navigate("/farmer-dashboard"); // ✅ Redirect back to dashboard after completion
        } catch (error) {
            alert(error.response?.data?.message || "Profile creation failed");
        }
    };

    return (
        <div className="h-screen w-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="w-[35%] bg-white p-6 shadow-lg rounded-lg">
                <h2 className="text-2xl font-bold text-gray-800 text-center mb-4">Complete Your Profile</h2>

                <div className="mb-3">
                    <input type="text" placeholder="Full Name" {...register("fullName")} className="w-full border p-3 rounded-md" />
                    <p className="text-red-500">{errors.fullName?.message}</p>
                </div>

                <div className="mb-3">
                    <input type="text" placeholder="Mobile Number" {...register("mobile")} className="w-full border p-3 rounded-md" />
                    <p className="text-red-500">{errors.mobile?.message}</p>
                </div>

                <div className="mb-3">
                    <input type="text" placeholder="Aadhaar Number" {...register("aadhaar")} className="w-full border p-3 rounded-md" />
                    <p className="text-red-500">{errors.aadhaar?.message}</p>
                </div>

                <div className="mb-3">
                    <select {...register("gender")} className="w-full border p-3 rounded-md">
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                        <option value="Other">Other</option>
                    </select>
                    <p className="text-red-500">{errors.gender?.message}</p>
                </div>

                <div className="mb-5">
                    <select {...register("language")} className="w-full border p-3 rounded-md">
                        <option value="">Select Language</option>
                        <option value="Hindi">Hindi</option>
                        <option value="Marathi">Marathi</option>
                        <option value="English">English</option>
                    </select>
                    <p className="text-red-500">{errors.language?.message}</p>
                </div>

                <button type="submit" className="w-full bg-green-600 text-white p-3 rounded-md hover:bg-green-700">
                    Submit Profile
                </button>
            </form>
        </div>
    );
};

export default FarmerOnboarding;
