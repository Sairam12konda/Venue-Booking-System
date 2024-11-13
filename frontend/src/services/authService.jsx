// src/services/authService.js
import api from './api';

export const register = async (userData) => {
    try {
        console.log("Sending user data to /register:", userData); // Verify data before sending
        const response = await api.post('/users/register', userData);
        console.log("Response from server:", response.data); // Check server response
        return response.data;
    } catch (error) {
        console.error('Error during registration:', error);
        throw error;
    }
};


export const login = async (credentials) => {
    try {
        const response = await api.post('/users/login', credentials);
        return response.data;
    } catch (error) {
        console.error('Error during login:', error);
        throw error;
    }
};

export const logout = async () => {
    try {
        const response = await api.post('/logout');
        return response.data;
    } catch (error) {
        console.error('Error during logout:', error);
        throw error;
    }
};
