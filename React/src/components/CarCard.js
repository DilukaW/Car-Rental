import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";
import lambo from "../Images/lamborghiniCar.jpeg";
import cadilac from "../Images/cadilacCar.jpeg";
import bmw from "../Images/bmwCar.jpeg";
import "../style/carCard.css";
import { FaCar, FaUsers, FaSnowflake, FaDoorOpen } from "react-icons/fa";

const CarCard = ({ car }) => {
    return (
        <div className="col-lg-4 col-md-6 mb-4 d-flex">
            <div className="card bg-dark text-white w-100">
                <img
                    src={car.image}
                    className="card-img-top"
                    alt={car.name}
                    style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body text-center">
                    <h5 className="card-title">— {car.name} —</h5>
                    <p className="card-text">Starting at ${car.price} / Day</p>
                    <div className="features-grid">
                        <div className="feature-item">
                            <FaCar /> <span>{car.type}</span>
                        </div>
                        <div className="feature-item">
                            <FaUsers /> <span>{car.seats} Seats</span>
                        </div>
                        <div className="feature-item">
                            <FaDoorOpen /> <span>{car.fuel}</span>
                        </div>
                        <div className="feature-item">
                            <FaSnowflake /> <span>AC / Heater</span>
                        </div>
                    </div>
                </div>
                <div className="card-footer d-flex justify-content-center">
                    <Link to={`/car-details/${car.name}`} className="btn btn-outline-light btn-sm">Rent Now</Link>

                </div>
            </div>
        </div>
    );
};

const CarCards = ({ cars }) => {
    // const cars = [
    //     {
    //         name: "Cadillac",
    //         price: 80,
    //         type: "SUV",
    //         seats: 5,
    //         doors: 4,
    //         image: cadilac,
    //     },
    //     {
    //         name: "BMW",
    //         price: 70,
    //         type: "Sedan",
    //         seats: 4,
    //         doors: 4,
    //         image: bmw,
    //     },
    //     {
    //         name: "Lamborghini",
    //         price: 120,
    //         type: "Convertible",
    //         seats: 2,
    //         doors: 2,
    //         image: lambo,
    //     },
    // ];

    return (
        <div className="d-flex flex-column container d-flex py-5">

            <h2 className="text-center text-white mb-4">Our Featured Cars</h2>

            <div className="row" >
                {cars.map((car, index) => (
                    <CarCard key={index} car={car} />
                ))}
            </div>
        </div>
    );
};

export default CarCards;
