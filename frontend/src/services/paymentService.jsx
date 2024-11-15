import api from './api';

export const processPayment = async (paymentData) => {
    try {
        const response = await api.post('/payments/add', paymentData);
        return response.data; // Response will now include payment_id
    } catch (error) {
        console.error('Error processing payment:', error);
        throw error;
    }
};
