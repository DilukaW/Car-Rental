// src/components/PaymentGateway.js
import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { updatePayment } from '../services/api';

const PaymentGateway = () => {

    const location = useLocation();
    const navigate = useNavigate(); // Get car name from URL

    // Parse the query string to get the 'price' value
    const queryParams = new URLSearchParams(location.search);
    const price = queryParams.get('price');
    const bookingId = queryParams.get('bookingId');

    useEffect(() => {
        console.log('Car ID:', bookingId);
        console.log('Price:', price);
    }, [bookingId, price]);

    const [paymentDetails, setPaymentDetails] = useState({
        cardNumber: '',
        cardHolderName: '',
        expiryDate: '',
        cvv: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setPaymentDetails({ ...paymentDetails, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await updatePayment(bookingId, price);
            if (response) {
                alert('Payment submitted successfully!');
                // Redirect to a success page or update the UI accordingly
                navigate('/');
            }
        } catch (error) {
            console.error('Error:', error);
        }


        // Add payment processing logic here

    };

    return (

        <div className="homepage text-white " style={{ backgroundColor: "#0F0F24" }}>

            <div className="container d-flex flex-column justify-content-center align-items-center ">
                <h1 className="mb-4">Payment Gateway</h1>

                <div className="col-md-6 card bg-dark text-white p-4 mb-4">
                    <form onSubmit={handleSubmit}>
                        <div className="">
                            <label htmlFor="cardNumber" className="form-label">Card Number</label>
                            <input
                                type="text"
                                id="cardNumber"
                                name="cardNumber"
                                className="form-control"
                                value={paymentDetails.cardNumber}
                                onChange={handleChange}
                                placeholder="Enter your card number"
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="cardHolderName" className="form-label">Cardholder Name</label>
                            <input
                                type="text"
                                id="cardHolderName"
                                name="cardHolderName"
                                className="form-control"
                                value={paymentDetails.cardHolderName}
                                onChange={handleChange}
                                placeholder="Enter the name on the card"
                                required
                            />
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="expiryDate" className="form-label">Expiry Date</label>
                                <input
                                    type="month"
                                    id="expiryDate"
                                    name="expiryDate"
                                    className="form-control"
                                    value={paymentDetails.expiryDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="cvv" className="form-label">CVV</label>
                                <input
                                    type="text"
                                    id="cvv"
                                    name="cvv"
                                    className="form-control"
                                    value={paymentDetails.cvv}
                                    onChange={handleChange}
                                    placeholder="Enter CVV"
                                    maxLength={3}
                                    required
                                />
                            </div>
                        </div>
                        <div className="d-grid">
                            <button type="submit" className="btn btn-primary">Submit Payment</button>
                        </div>
                    </form>
                </div>
            </div>

        </div>
    );
};

export default PaymentGateway;
