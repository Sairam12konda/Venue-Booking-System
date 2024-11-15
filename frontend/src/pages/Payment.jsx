import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom'; // Import necessary hooks
import { processPayment } from '../services/paymentService'; // For processing payment
import { createBooking } from '../services/bookingService'; // For creating booking

const Payment = () => {
    const { state } = useLocation(); // Get the state passed from the Venues page
    const [paymentMethod, setPaymentMethod] = useState('');
    const navigate = useNavigate();

    // Destructure venueId, userId, and amount from the state
    const { venueId, userId, amount } = state || {};

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Process payment and get the payment_id
            const response = await processPayment({ venueId, userId, paymentMethod });
            const payment_id = response.payment_id;
            console.log('Payment ID:', payment_id);
            console.log(userId,venueId,payment_id)
            // Now, create a booking
            const bookingResponse = await createBooking({
                user_id: userId,
                venue_id: venueId,
                payment_id: payment_id,
            });

            console.log('Booking created:', bookingResponse);

            // After booking is created, navigate to the Bookings page
            navigate('/Bookings', { state: { userId } });
            alert('Payment and booking successful');
        } catch (error) {
            alert('Payment or booking failed: ' + error.message);
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
                    <option value="upi">UPI</option>
                </select>
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded-lg">Pay Now</button>
            </form>
        </div>
    );
};

export default Payment;
