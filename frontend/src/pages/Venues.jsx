import React, { useEffect, useState } from 'react';
import VenueCard from '../components/VenueCard';
import { getVenues } from '../services/venueService';
import { useNavigate } from 'react-router-dom';

const Venues = () => {
    const [venues, setVenues] = useState([]);
    const [isAdmin, setIsAdmin] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchVenues = async () => {
            try {
                const data = await getVenues();
                if (Array.isArray(data)) {
                    setVenues(data);
                } else {
                    console.error("Data is not an array:", data);
                }
            } catch (error) {
                console.error("Error fetching venues:", error);
            }
        };

        // Check admin status from localStorage
        const adminStatus = localStorage.getItem('isadmin');
        console.log('Admin status from localStorage:', adminStatus); // Debugging statement
        setIsAdmin(adminStatus === '1');

        fetchVenues();
    }, []);

    const handleBookVenue = (venue) => {
        alert(`Booking initiated for ${venue.venue_name}`);
        navigate('/payment', {
            state: { venueId: venue.venue_id, userId: localStorage.getItem('user_id'), amount: venue.cost },
        });
    };

    return (
        <div className="p-6 relative">
            <h2 className="text-3xl font-bold text-center mb-6">Available Venues</h2>
            {isAdmin && (
                <button
                    onClick={() => navigate('/add-venue')}
                    className="absolute top-4 right-4 px-4 py-2 bg-blue-500 text-white rounded shadow"
                >
                    Add Venue
                </button>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {venues.map((venue) => (
                    <VenueCard key={venue.venue_id} venue={venue} onBook={handleBookVenue} />
                ))}
            </div>
        </div>
    );
};

export default Venues;
