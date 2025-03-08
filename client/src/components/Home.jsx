import { Link } from 'react-router-dom';
import React from 'react';

const Home = () => {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-gray-100 space-y-6">
            <h1 className="text-4xl font-bold text-gray-800">Welcome to <span className='text-emerald-600'>KrishiSeva</span></h1>
            <p className="text-gray-600 text-lg">Empowering Farmers with Technology</p>
            
            <div className="flex space-x-4">
                <Link to="/signup" 
                    className="bg-emerald-600  !text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-emerald-700 transition"
                >
                    Signup
                </Link>
                <Link to="/login" 
                    className="bg-purple-600 !text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-purple-700 transition"
                >
                    Login
                </Link>
            </div>
        </div>
    );
};

export default Home;
