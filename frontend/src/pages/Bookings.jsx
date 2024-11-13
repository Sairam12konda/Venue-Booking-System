// src/pages/Bookings.js
import React, { useEffect, useState } from 'react';
import { getUserBookings } from '../services/venueService';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchBookings = async () => {
            const data = await getUserBookings();
            setBookings(data);
        };
        fetchBookings();
    }, []);

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold text-center mb-4">Your Bookings</h2>
            {bookings.length > 0 ? (
                <ul className="space-y-4">
                    {bookings.map(booking => (
                        <li key={booking.booking_id} className="p-4 border rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">{booking.venue_name}</h3>
                            <p>Location: {booking.location}</p>
                            <p>Date: {booking.booking_date}</p>
                            <p>Status: {booking.status === 1 ? "Confirmed" : "Pending"}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="text-center text-gray-500">No bookings yet.</p>
            )}
        </div>
    );
};

export default Bookings;
