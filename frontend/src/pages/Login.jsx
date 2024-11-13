// src/pages/Login.js
import React, { useState, useEffect } from 'react';
import { login } from '../services/authService';


const Login = ({ setIsLoggedIn }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Reset fields if logged out or not logged in (refresh behavior)
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (loggedInStatus !== 'true') {
            setEmail('');
            setPassword('');
        }
    }, [setIsLoggedIn]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login({ email, password });

            // Store login details in localStorage
            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('email', email);
            localStorage.setItem('password', password);

            // Update the login state
            setIsLoggedIn(true);
            alert('Login successful');
        } catch (error) {
            alert('Login failed');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-80 p-4 shadow-lg rounded-lg bg-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 mb-4 border rounded-lg"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    className="w-full p-2 mb-4 border rounded-lg"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className="w-full p-2 bg-blue-500 text-white rounded-lg">Login</button>
            </form>
        </div>
    );
};


export default Login;