import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import axios from "axios";

// ✅ Validation schema
const schema = yup.object().shape({
    email: yup.string().trim().email("Invalid email").required("Email is required"),
    password: yup.string().trim().min(6, "Password must be at least 6 characters").required("Password is required"),
});

const Login = () => {
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
    });

    // ✅ Redirect if user is already logged in
    useEffect(() => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (user && user.role) {
            navigate(`/${user.role}-dashboard`);
        }
    }, [navigate]);

    // ✅ Handle Login
    const onSubmit = async (data) => {
        try {
            const response = await axios.post("http://localhost:8080/api/auth/login", data);
            const userData = response.data?.data?.user;
            console.log("User Data:", userData);

            if (!userData) throw new Error("Invalid response from server");

            // ✅ Store user data & token in localStorage
            localStorage.setItem("user", JSON.stringify(userData));
            localStorage.setItem("token", response.data?.data?.token); // Store JWT token

           
            navigate(`/${userData.role}-dashboard`);
        } catch (error) {
            console.error("Login error:", error);
            alert(error.response?.data?.message || "Invalid credentials. Please try again.");
        }
    };

    return (
        <div className="h-screen flex justify-center items-center bg-gray-100">
            <form onSubmit={handleSubmit(onSubmit)} className="w-1/4 h-auto bg-white p-16 shadow-xl rounded-xl">
                <h2 className="text-3xl font-bold text-gray-800 text-center mb-6">Login</h2>

                {/* ✅ Email Input */}
                <div className="mb-4">
                    <input 
                        type="email" 
                        placeholder="Enter your email" 
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-emerald-500" 
                        {...register("email")} 
                    />
                    <p className="text-red-500 text-sm mt-1">{errors.email?.message}</p>
                </div>

                {/* ✅ Password Input */}
                <div className="mb-6">
                    <input 
                        type="password" 
                        placeholder="Enter your password" 
                        className="w-full border border-gray-300 p-3 rounded-md focus:ring-2 focus:ring-emerald-500" 
                        {...register("password")} 
                    />
                    <p className="text-red-500 text-sm mt-1">{errors.password?.message}</p>
                </div>

                {/* ✅ Submit Button */}
                <button type="submit" className="w-full bg-emerald-600 text-white font-semibold py-3 rounded-md hover:bg-emerald-700 transition">
                    Login
                </button>

                {/* ✅ Signup Link */}
                <p className="text-center text-gray-600 mt-4">
                    Don't have an account?{" "}
                    <span onClick={() => navigate("/signup")} className="text-emerald-600 cursor-pointer hover:underline">
                        Sign up
                    </span>
                </p>
            </form>
        </div>
    );
};

export default Login;
