import Navbar from "../components/Navbar";
import HeroBanner from "../components/HeroBanner";
import LogosSection from "../components/LogoSection";
import CarCard from "../components/CarCard";
import React, { useState, useEffect } from 'react';
import HowItWorks from "../components/HowItWorks";
import Footer from "../components/Footer";
import { fetchCars } from "../services/api";
import CarCards from "../components/CarCard";

const CarRentalHome = () => {

    const [cars, setCars] = useState([]); // State to hold car data

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carData = await fetchCars();
                setCars(carData);
                console.log(carData)
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };



        fetchData();
    }, []);


    return (
        <div className="homepage text-white" style={{ backgroundColor: "#0F0F24", minHeight: "100vh" }}>
            <Navbar />
            <HeroBanner />
            <LogosSection />

            <CarCards cars={cars} />

            <HowItWorks />
            <Footer />
        </div>
    );
};

export default CarRentalHome;