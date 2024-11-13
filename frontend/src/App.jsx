// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Venues from './pages/Venues';
import Bookings from './pages/Bookings';
import AddVenue from './pages/AddVenue';
import Payment from './pages/Payment';

function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Check localStorage for login status when the component mounts
        const loggedInStatus = localStorage.getItem('isLoggedIn');
        if (loggedInStatus === 'true') {
            setIsLoggedIn(true);
        }
    }, []);

    return (
        <Router>
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
                <Route path="/register" element={<Register />} />
                <Route
                    path="/venues"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Venues />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/bookings"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Bookings />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/add-venue"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <AddVenue />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/payment"
                    element={
                        <ProtectedRoute isLoggedIn={isLoggedIn}>
                            <Payment />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;
