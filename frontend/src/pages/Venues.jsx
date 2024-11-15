// src/pages/Venues.js
import React, { useEffect, useState } from 'react';
import VenueCard from '../components/VenueCard';
import { getVenues } from '../services/venueService';
import { useNavigate } from 'react-router-dom';

const Venues = () => {
    const [venues, setVenues] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchVenues = async () => {
            try {
                // Use getVenues directly and expect the correct format
                const data = await getVenues();  // Assuming getVenues() already returns response.data
                console.log(data)
                // Check if data is an array and update state
                if (Array.isArray(data)) {
                    setVenues(data);
                } else {
                    console.error("Data is not an array:", data);
                }
            } catch (error) {
                console.error("Error fetching venues:", error);
            }
        };
        
        fetchVenues();
    }, []);

    const handleBookVenue = (venue) => {
        alert(`Booking initiated for ${venue.venue_name}`);
        // Use navigate here to programmatically redirect
        navigate('/payment', { state: { venueId: venue.venue_id,userId: localStorage.getItem('user_id') ,amount: venue.cost} });
    };
    return (
        <div className="p-6">
            <h2 className="text-3xl font-bold text-center mb-6">Available Venues</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue) => (
                    <VenueCard key={venue.venue_id} venue={venue} onBook={handleBookVenue} />
                ))}
            </div>
        </div>
    );
};

export default Venues;
