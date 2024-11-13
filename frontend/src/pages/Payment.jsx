import React, { useState } from 'react';
import { useLocation } from 'react-router-dom'; // Import useLocation
import { processPayment } from '../services/paymentService';

const Payment = () => {
    const { state } = useLocation(); // Get the state passed from Venues
    const [paymentMethod, setPaymentMethod] = useState('');
    
    // Destructure the venueId and amount from state
    const { venueId, amount } = state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            
            await processPayment({ venueId, paymentMethod });
            alert('Payment successful');
        } catch (error) {
            alert('Payment failed' + error);
        }
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <form onSubmit={handleSubmit} className="w-full max-w-md p-4 shadow-lg rounded-lg bg-white">
                <h2 className="text-2xl font-bold mb-4 text-center">Make Payment</h2>
                Price to Pay:
                <input
                    type="text"
                    placeholder="Amount"
                    className="w-full p-2 mb-4 border rounded-lg"
                    value={amount}
                    readOnly
                />
                Select Payment Method:
                <select
                    value={paymentMethod}
                    onChange={(e) => setPaymentMethod(e.target.value)}
                    className="w-full p-2 mb-4 border rounded-lg"
                    required
                >
                    <option value="credit_card">Credit Card</option>
                    <option value="paypal">PayPal</option>
                </select>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">Pay Now</button>
            </form>
        </div>
    );
};

export default Payment;
