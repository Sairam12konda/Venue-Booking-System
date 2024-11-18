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
            // Send login data and get the response
            const response = await login({ email, password });
            console.log(response)
            const data = await response['user'];
            console.log(data[0])
            // Check if login was successful
            if (response['message'] === 'Login successful!' && data) {
                const user_id = data[0];
                localStorage.setItem('isLoggedIn', 'true');
                localStorage.setItem('email', email);
                localStorage.setItem('user_id', user_id);  // Store user_id instead of password for security
                localStorage.setItem('password', password);
                localStorage.setItem('isadmin', data[4]);
                // Update the login state
                setIsLoggedIn(true);
                alert('Login successful');
            } else {
                throw new Error(data.message || 'Login failed');
            }
        } catch (error) {
            alert(error.message);
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