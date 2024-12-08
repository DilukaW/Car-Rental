// src/components/BookingPage.js
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { IoIosAirplane, IoMdSettings } from 'react-icons/io'; // Icon imports

const BookingPage = () => {
    const { carName } = useParams(); // Get car name from URL
    const navigate = useNavigate();

    const [car, setCar] = useState(null);

    // Sample car data
    const cars = [
        {
            name: "Toyota Corolla",
            description: "Comfortable and reliable car for your trips.",
            price: 45,
            image: "https://via.placeholder.com/300x200?text=Toyota+Corolla",
            features: ["Air Conditioning", "Bluetooth", "Automatic Transmission"],
        },
        {
            name: "BMW 5 Series",
            description: "Luxury car with premium features and style.",
            price: 150,
            image: "https://via.placeholder.com/300x200?text=BMW+5+Series",
            features: ["Leather Seats", "GPS Navigation", "Bluetooth"],
        },
        {
            name: "Honda Civic",
            description: "Fuel-efficient and affordable for daily use.",
            price: 40,
            image: "https://via.placeholder.com/300x200?text=Honda+Civic",
            features: ["Air Conditioning", "Bluetooth", "Automatic Transmission"],
        },
        {
            name: "Mercedes-Benz A-Class",
            description: "Stylish and compact luxury car for your travels.",
            price: 120,
            image: "https://via.placeholder.com/300x200?text=Mercedes+A-Class",
            features: ["Leather Seats", "Bluetooth", "GPS Navigation"],
        }
    ];

    useEffect(() => {
        // Find the car that matches the carName from the URL
        const selectedCar = cars.find((car) => car.name === carName);
        setCar(selectedCar);
    }, [carName]);

    // Redirect to Booking Confirmation Page on button click
    const handleBookNow = () => {
        // Redirect to the booking confirmation page
        navigate(`/book/${carName}`);
    };

    if (!car) return <div>Loading...</div>;

    return (
        <div className="container mt-5">
            <h2 className="text-center">{car.name} - Details</h2>
            <div className="row">
                <div className="col-md-6">
                    <img src={car.image} alt={car.name} className="img-fluid" />
                </div>
                <div className="col-md-6">
                    <h3>{car.name}</h3>
                    <p>{car.description}</p>
                    <h5><strong>Price: </strong>${car.price} per day</h5>
                    <div className="mt-3">
                        <h5>Features:</h5>
                        <ul>
                            {car.features.map((feature, index) => (
                                <li key={index}><IoMdSettings /> {feature}</li>
                            ))}
                        </ul>
                    </div>
                    <button onClick={handleBookNow} className="btn btn-success btn-lg mt-4">Book Now</button>
                </div>
            </div>
        </div>
    );
};

export default BookingPage;
