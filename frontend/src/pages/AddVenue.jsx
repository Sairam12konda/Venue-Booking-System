import React, { useState } from 'react';
import { addVenue } from '../services/venueService'; // Import the addVenue service

const AddVenue = () => {
    const [venue, setVenue] = useState({
        venue_name: '',
        capacity: '',
        location: '',
        booking_date: '',
        start_time: '',
        end_time: '',
        cost: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setVenue({ ...venue, [name]: value });
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await addVenue(venue); // Call the service
            alert('Venue added successfully!');
            setVenue({
                venue_name: '',
                capacity: '',
                location: '',
                booking_date: '',
                start_time: '',
                end_time: '',
                cost: '',
            });
        } catch (error) {
            console.error('Error:', error);
            alert('Failed to add venue. Please try again.');
        }
    };
    

    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Add a New Venue</h2>
            <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
                <input
                    type="text"
                    name="venue_name"
                    placeholder="Venue Name"
                    value={venue.venue_name}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="capacity"
                    placeholder="Capacity"
                    value={venue.capacity}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={venue.location}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="date"
                    name="booking_date"
                    value={venue.booking_date}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="datetime-local"
                    name="start_time"
                    value={venue.start_time}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="datetime-local"
                    name="end_time"
                    value={venue.end_time}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <input
                    type="number"
                    name="cost"
                    placeholder="Cost"
                    value={venue.cost}
                    onChange={handleChange}
                    className="w-full p-2 border rounded"
                    required
                />
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white p-2 rounded shadow"
                >
                    Add Venue
                </button>
            </form>
        </div>
    );
};

export default AddVenue;
