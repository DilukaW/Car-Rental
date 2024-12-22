
import React, { useState, useEffect } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Navbar, Nav, Alert, Form, Modal } from "react-bootstrap";
import { fetchBookings } from '../services/api';

const BookingDetails = () => {


    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {

                const bookingsData = await fetchBookings()
                setBookings(bookingsData);

            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };
        fetchData();
    }, []);


    return (
        <>
            <Table striped bordered hover className="table table-dark mt-4">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Vehicle ID</th>
                        <th>Pickup Location</th>
                        <th>Pickup Time</th>
                        <th>Pickup Date</th>
                        <th>Drop off Date</th>
                        <th>Drop off Location</th>
                        <th>Drop off Time</th>
                        <th>Rental Type</th>
                        <th>price</th>
                        <th>Payment</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {bookings
                        .filter((booking) => booking.userId === localStorage.getItem("userId"))
                        .map((booking, index) => {
                            const currentDate = new Date();
                            const pickupDate = new Date(booking.pickupDate);
                            const dropoffDate = new Date(booking.dropoffDate);

                            // Determine Availability Status
                            let status;
                            let statusColor;
                            if (currentDate < pickupDate) {
                                status = "Upcoming";
                                statusColor = "green";
                            } else if (currentDate >= pickupDate && currentDate <= dropoffDate) {
                                status = "Ongoing";
                                statusColor = "orange";
                            } else {
                                status = "Completed";
                                statusColor = "red";
                            }

                            // Ensure both payment and price are compared as numbers
                            const paymentStatus = Number(booking.payment) === Number(booking.price) ? "Done" : "Pending";
                            const paymentColor = Number(booking.payment) === Number(booking.price) ? "green" : "red";



                            return (
                                <tr key={booking.id}>
                                    <td>{index + 1}</td>
                                    <td>{booking.id}</td>
                                    <td>{booking.pickupLocation}</td>
                                    <td>{booking.pickupTime}</td>
                                    <td>{booking.pickupDate}</td>
                                    <td>{booking.dropoffDate}</td>
                                    <td>{booking.dropoffLocation}</td>
                                    <td>{booking.dropoffTime}</td>
                                    <td>{booking.rentalType}</td>
                                    <td>{booking.price}</td>
                                    <td style={{ color: paymentColor }}>{paymentStatus}</td>
                                    <td style={{ color: statusColor }}>{status}</td>
                                </tr>
                            );
                        })}
                </tbody>



            </Table>
        </>);
}

export default BookingDetails