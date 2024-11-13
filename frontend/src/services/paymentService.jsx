// src/services/paymentService.js
import api from './api';

export const processPayment = async (paymentData) => {
    try {
        const response = await api.post('/payments/add', paymentData);
        return response.data;
    } catch (error) {
        console.error('Error processing payment:', error);
        throw error;
    }
};
