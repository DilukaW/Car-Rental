// src/components/BookingConfirmation.js
import React from 'react';
import { useParams, navigate, useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { FaCar, FaUsers, FaSnowflake, FaDoorOpen, FaTicketAlt, FaOptinMonster, FaFeather, FaCartPlus } from "react-icons/fa";


const BookingConfirmation = () => {
    const { carName } = useParams();
    const navigate = useNavigate(); // Get car name from URL

    const handleBooking = (car) => {
        navigate(`/checkout/${car.name}`);
    };

    return (
        <div className="homepage text-white" style={{ backgroundColor: "#0F0F24" }}>
            <Navbar />
            <div className="container my-5" >
                <div className="table-responsive col-md-10">
                    <table className="table table-dark table-borderless">
                        <thead>
                            <tr class="table-active">
                                <th scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope='col'>Duration</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Pickup Location:</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Pick-Off Location:</td>
                                <td></td>
                                <td></td>
                                <td></td>
                            </tr>
                            <tr>
                                <td>Pick Up Date:</td>
                                <td rowSpan={3}>Pickup Location:</td>
                                <td rowSpan={3}>Pickup Location:</td>
                                <td rowSpan={3}>Pickup Location:</td>
                            </tr>
                            <tr>
                                <td>Drop Off Date:</td>
                            </tr>
                            <tr>
                                <td>Vehicle ID:</td>
                            </tr>
                            <tr className='text-center'>
                                <td colSpan={4}><button className='btn btn-warning text-white' onClick={handleBooking}>
                                    <FaCartPlus /> Proceed To Checkout
                                </button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <Footer />
        </div>

    );
};

export default BookingConfirmation;
