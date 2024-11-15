// src/services/venueService.js
import api from './api';

export const getVenues = async () => {
    try {
        const response = await api.get('/venues');
        return response.data;
    } catch (error) {
        console.error('Error fetching venues:', error);
        throw error;
    }
};

export const addVenue = async (venueData) => {
    try {
        const response = await api.post('/venues/add', venueData);
        return response.data;
    } catch (error) {
        console.error('Error adding new venue:', error);
        throw error;
    }
};


