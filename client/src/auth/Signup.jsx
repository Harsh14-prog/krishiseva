import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";



// Validation schema
const schema = yup.object().shape({
    name: yup.string().trim().required("Name is required"),
    email: yup.string().trim().email("Invalid email").required("Email is required"),
    password: yup.string().trim().min(6, "Password must be at least 6 characters").required("Password is required"),
    role: yup.string().oneOf(["farmer", "mentor", "exporter"], "Invalid Role").required("Role is required"),
});

const Signup = () => {

    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

const onSubmit = async (data) => {

    try {
        
        console.log("Sending API request...");
        const response = await axios.post("/api/auth/signup" , data,  {withCredentials: true})
        alert("Signup Successfully")
        navigate("/login") 

       } catch (error) {

         alert(error.response?.data?.message || "Signup failed");
        }
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="h-screen flex justify-center items-center bg-gray-100">
            <div className="w-1/4 h-auto bg-white p-16 shadow-lg rounded-xl">
                <h1 className="text-2xl font-bold text-gray-800 mb-4 text-center">Signup</h1>

                <input {...register("name")} type="text" placeholder="Name" className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-emerald-500" />
                <p className="text-red-500">{errors.name?.message}</p>

                <input {...register("email")} type="email" placeholder="Email" className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-emerald-500" />
                <p className="text-red-500">{errors.email?.message}</p>

                <input {...register("password")} type="password" placeholder="Password" className="w-full border border-gray-300 p-3 rounded-md mb-3 focus:ring-2 focus:ring-emerald-500" />
                <p className="text-red-500">{errors.password?.message}</p>

                <select {...register("role")} className="w-full border border-gray-300 p-3 rounded-md mb-5 focus:ring-2 focus:ring-emerald-500">
                    <option value="">Select Role</option>
                    <option value="farmer">Farmer</option>
                    <option value="mentor">Mentor</option>
                    <option value="exporter">Exporter</option>
                </select>
                <p className="text-red-500">{errors.role?.message}</p>

                <button type="submit" className="w-full bg-emerald-600 text-white font-semibold p-3 rounded-md hover:bg-emerald-700 transition">
                    Sign Up
                </button>

                <p className="text-center text-gray-600 mt-4">
                    Already registered?{" "}
                   <span onClick={() => navigate("/login")} className="text-emerald-600 cursor-pointer hover:underline">
                   Login
                 </span>
                </p>

            </div>
        </form>
    );
};

export default Signup;
