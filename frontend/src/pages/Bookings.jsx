import React, { useEffect, useState } from 'react';
import { getBookings } from '../services/bookingService';

const Bookings = () => {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchBookings = async () => {
            try {
                const data = await getBookings(); // Fetch bookings using the service
                setBookings(data);
            } catch (error) {
                console.error('Error fetching bookings:', error);
                setError('Failed to load bookings');
            } finally {
                setLoading(false); // Ensure loading is stopped after the request completes
            }
        };

        fetchBookings();
    }, []); // Run only once when the component mounts

    return (
        <div className="p-4">
            <h2 className="text-3xl font-bold text-center mb-4">Your Bookings</h2>

            {loading ? (
                <p className="text-center text-gray-500">Loading...</p>
            ) : error ? (
                <p className="text-center text-red-500">{error}</p>
            ) : bookings.length > 0 ? (
                <ul className="space-y-4">
                    {bookings.map((booking) => (
                        <li key={booking.booking_id} className="p-4 border rounded-lg shadow-md">
                            <h3 className="text-xl font-semibold">Venue ID: {booking.venue_id}</h3>
                            <p>Booking ID: {booking.booking_id}</p>
                            <p>Payment ID: {booking.payment_id}</p>
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
    