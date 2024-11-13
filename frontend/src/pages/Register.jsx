// src/pages/Register.js
import React, { useState } from 'react';
import { register } from '../services/authService';

const Register = () => {
    const [userDetails, setUserDetails] = useState({ name: '', email: '', password: '' });

    const handleChange = (e) => setUserDetails({ ...userDetails, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await register(userDetails);
            alert('Registration successful');
        } catch (error) {
            alert('Registration failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-80 p-4 shadow-lg rounded-lg bg-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Register</h2>
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    className="w-full p-2 mb-4 border rounded-lg"
                    onChange={handleChange}
                    required
                />
                <input
                    type="email"
                    name="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded-lg"
                    onChange={handleChange}
                    required
                />
                <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded-lg"
                    onChange={handleChange}
                    required
                />
                <button className="w-full p-2 bg-blue-500 text-white rounded-lg">Register</button>
            </form>
        </div>
    );
};

export default Register;
