// src/services/bookingService.js
import api from './api';

export const getBookings = async () => {
    try {
        const userId = localStorage.getItem('user_id'); // Fetch user_id from localStorage
        if (!userId) {
            throw new Error('User ID not found in localStorage');
        }

        const response = await api.post('/bookings/', { user_id: userId }); 
        console.log(response)// Send user_id in the request body
        return response.data; // Return the data
    } catch (error) {
        console.error('Error fetching bookings:', error);
        throw error; // Re-throw error for handling in the component
    }
};


export const createBooking = async (bookingData) => {
    try {
        const response = await api.post('/bookings/create', bookingData);
        return response.data;
    } catch (error) {
        console.error('Error creating booking:', error);
        throw error;
    }
};

