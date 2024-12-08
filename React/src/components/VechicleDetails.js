// src/components/VehicleDetails.js
import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const VehicleDetails = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const vehicle = location.state?.vehicle || {};

    const [bookingData, setBookingData] = useState({
        startDate: '',
        endDate: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setBookingData({ ...bookingData, [name]: value });
    };

    const handleBookingSubmit = (e) => {
        e.preventDefault();
        console.log('Booking Data:', bookingData);
        alert('Booking Confirmed!');
        navigate('/');
    };

    return (
        <div className="container my-5">
            <div className="row">
                {/* Vehicle Details */}
                <div className="col-lg-8">
                    <div className="card shadow-lg">
                        <img
                            src={vehicle.image || 'https://via.placeholder.com/800x400'}
                            alt={vehicle.name || 'Vehicle'}
                            className="card-img-top"
                        />
                        <div className="card-body">
                            <h2 className="card-title">{vehicle.name || 'Vehicle Name'}</h2>
                            <p className="card-text">{vehicle.description || 'Vehicle description goes here...'}</p>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item"><strong>Price:</strong> ${vehicle.price || 'N/A'}/day</li>
                                <li className="list-group-item"><strong>Seats:</strong> {vehicle.seats || 'N/A'}</li>
                                <li className="list-group-item"><strong>Fuel Type:</strong> {vehicle.fuel || 'N/A'}</li>
                                <li className="list-group-item"><strong>Transmission:</strong> {vehicle.transmission || 'N/A'}</li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Booking Form */}
                <div className="col-lg-4">
                    <div className="card shadow-lg p-4">
                        <h3 className="text-center mb-4">Book This Vehicle</h3>
                        <form onSubmit={handleBookingSubmit}>
                            <div className="mb-3">
                                <label htmlFor="startDate" className="form-label">Start Date</label>
                                <input
                                    type="date"
                                    id="startDate"
                                    name="startDate"
                                    className="form-control"
                                    value={bookingData.startDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="endDate" className="form-label">End Date</label>
                                <input
                                    type="date"
                                    id="endDate"
                                    name="endDate"
                                    className="form-control"
                                    value={bookingData.endDate}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactName" className="form-label">Your Name</label>
                                <input
                                    type="text"
                                    id="contactName"
                                    name="contactName"
                                    className="form-control"
                                    value={bookingData.contactName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactEmail" className="form-label">Email</label>
                                <input
                                    type="email"
                                    id="contactEmail"
                                    name="contactEmail"
                                    className="form-control"
                                    value={bookingData.contactEmail}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="contactPhone" className="form-label">Phone</label>
                                <input
                                    type="text"
                                    id="contactPhone"
                                    name="contactPhone"
                                    className="form-control"
                                    value={bookingData.contactPhone}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="text-center mt-4">
                                <button type="submit" className="btn btn-primary btn-lg w-100">Confirm Booking</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VehicleDetails;
