// src/components/VenueCard.js
import React from 'react';

const VenueCard = ({ venue, onBook }) => {
    return (
        <div className="p-4 bg-white rounded-lg shadow-md hover:shadow-lg transition">
            <h3 className="text-xl font-semibold text-blue-600">{venue.venue_name}</h3>
            <p className="text-gray-600">Capacity: {venue.capacity}</p>
            <p className="text-gray-600">Location: {venue.location}</p>
            <p className="text-gray-600">Booking_date: {venue.booking_date}</p>
            <p className="text-gray-600">Start_time: {venue.start_time}</p>
            <p className="text-gray-600">End_time: {venue.end_time}</p>
            <p className="text-gray-600">Available: {venue.availability_status ? "Yes" : "No"}</p>
            <p className="text-gray-800 font-bold">Cost: ${venue.cost}</p>
            <button
                className={`mt-4 px-4 py-2 rounded transition ${
                    venue.availability_status ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-gray-400 text-gray-200 cursor-not-allowed'
                }`}
                onClick={() => venue.availability_status && onBook(venue)}
                disabled={!venue.availability_status}
            >
                {venue.availability_status ? "Book Now" : "Unavailable"}
            </button>
        </div>
    );
};

export default VenueCard;
