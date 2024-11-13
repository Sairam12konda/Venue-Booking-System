// src/components/Navbar.js
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Clear login state from localStorage
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('email');
        localStorage.removeItem('password');
        localStorage.setItem('isLoggedIn', 'false');

        // Update the state in the parent component (App.js)
        setIsLoggedIn(false);

        // Show logout message (optional)
        alert('Logged out successfully');

        // Redirect to login page
        navigate('/');
    };

    return (
        <nav className="bg-gray-800 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <Link to="/" className="text-xl font-bold">Home</Link>
                <div className="flex space-x-4">
                    {isLoggedIn ? (
                        <>
                            <Link to="/venues" className="hover:text-gray-400">Venues</Link>
                            <Link to="/bookings" className="hover:text-gray-400">Bookings</Link>
                            <button onClick={handleLogout} className="hover:text-gray-400">Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/register" className="hover:text-gray-400">Register</Link>
                            <Link to="/login" className="hover:text-gray-400">Login</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
