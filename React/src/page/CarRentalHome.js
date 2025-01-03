
import HeroBanner from "../components/HeroBanner";
import LogosSection from "../components/LogoSection";

import React, { useState, useEffect } from 'react';
import HowItWorks from "../components/HowItWorks";

import { fetchCars, fetchBookings } from "../services/api";
import CarCards from "../components/CarCard";

const CarRentalHome = () => {
    // eslint-disable-next-line
    const [cars, setCars] = useState([]);
    // eslint-disable-next-line
    const [bookings, setBookings] = useState([]);
    const [filteredCars, setFilteredCars] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carData = await fetchCars();
                const bookingData = await fetchBookings();

                setCars(carData);
                setBookings(bookingData);

                // Filter cars where carId does NOT match any bookingId
                const unmatchedCars = carData.filter(car =>
                    !bookingData.some(booking => booking.id === car.id)
                );

                console.log(unmatchedCars)
                setFilteredCars(unmatchedCars);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, []);


    return (<div className="homepage text-white" style={{ backgroundColor: "#0F0F24", minHeight: "100vh" }}>


        <HeroBanner />
        <LogosSection />

        <CarCards cars={filteredCars} />

        <HowItWorks />

    </div>
    );
};

export default CarRentalHome;