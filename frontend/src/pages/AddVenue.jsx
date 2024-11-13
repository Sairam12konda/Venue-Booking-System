// src/pages/AddVenue.js
import React, { useState } from 'react';
import { addVenue } from '../services/venueService';

const AddVenue = () => {
    const [venueData, setVenueData] = useState({
        venue_name: '',
        capacity: 0,
        location: '',
        booking_date: '',
        start_time: '',
        end_time: '',
        cost_per_hour: 0,
    });

    const handleChange = (e) => {
        setVenueData({ ...venueData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addVenue(venueData);
            alert('Venue added successfully');
        } catch (error) {
            alert('Failed to add venue');
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-lg p-4 shadow-lg rounded-lg bg-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Add Venue</h2>
                {Object.keys(venueData).map((field) => (
                    <input
                        key={field}
                        type={field.includes("date") ? "datetime-local" : field.includes("cost") || field === "capacity" ? "number" : "text"}
                        name={field}
                        placeholder={field.replace(/_/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                        className="w-full p-2 mb-4 border rounded-lg"
                        value={venueData[field]}
                        onChange={handleChange}
                    />
                ))}
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">Add Venue</button>
            </form>
        </div>
    );
};

export default AddVenue;
