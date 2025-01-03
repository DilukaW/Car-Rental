import React, { useState, useEffect } from "react";
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from "react-router-dom";
import 'react-time-picker/dist/TimePicker.css';

import { FaCar, FaUsers, FaSnowflake, FaDoorOpen, FaFeather } from "react-icons/fa";

import "../style/carCard.css";
import { useLocation, useParams } from "react-router-dom";
import { getCarById } from "../services/api";


const App = () => {
    const navigate = useNavigate();
    // eslint-disable-next-line
    const location = useLocation();
    // const { car } = location.state || {}; // Access the passed state
    const { carId } = useParams(); // Fallback for dynamic ID usage



    const [rentalType, setRentalType] = useState("Day");
    const [pickupLocation, setPickupLocation] = useState("");
    const [dropoffLocation, setDropoffLocation] = useState("");
    const [pickupDate, setPickupDate] = useState("");
    const [pickupTime, setPickupTime] = useState("");
    const [dropoffDate, setDropoffDate] = useState("");
    const [dropoffTime, setDropoffTime] = useState("");
    const [price, setPrice] = useState("20");

    const [depositOption, setDepositOption] = useState("Pay Deposit");
    const [car, setCar] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const carData = await getCarById(carId);
                setCar(carData);
                console.log(carData)
                setPrice(carData.price)
            } catch (error) {
                console.error('Error fetching car data:', error);
            }
        };
        fetchData();

    }, [carId]);

    if (!car) {
        return <p>Car details not found. Please navigate from the home page.</p>;
    }


    const handleEnquiry = (e) => {
        e.preventDefault(); // Prevent form submission
        alert("Enquiry Submitted!");
    };

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default form submission
        if (localStorage.getItem("userId") != null) {

            const formData = {
                rentalType,
                pickupLocation,
                dropoffLocation,
                pickupDate,
                pickupTime,
                dropoffDate,
                dropoffTime,
                depositOption,
                price
            };

            console.log("Form Data Submitted:", formData);
            const queryString = new URLSearchParams(formData).toString();
            navigate(`/book-now/${carId}?${queryString}`);
        } else {
            navigate('/login')
        }


    };
    return (
        <div className="homepage text-white" style={{ backgroundColor: "#0F0F24", minHeight: "100vh" }}>
            <div style={styles.container} className="">
                <div className="container px-5 " style={styles.leftSection}>

                    <div className="row " style={{ height: "auto" }}>
                        <div className="col-md-6">
                            <img
                                // src={`/Images/${car.name}Car.jpeg`}
                                src={car.image}
                                alt={car.name}
                                className="img-fluid"
                                style={{ height: "400px" }}
                            />
                        </div>
                        <div className="col-md-6 bg-dark text-white rounded p-4" >
                            <h2 className="mb-4">{car.name}</h2>
                            <p>{car.description}</p>

                            <div>
                                <p>
                                    <FaCar /> Type: {car.type}
                                </p>
                                <p>
                                    <FaUsers /> Seats: {car.seats}
                                </p>
                                <p>
                                    <FaDoorOpen /> Fuel: {car.fuel}
                                </p>
                                <p>
                                    <FaSnowflake /> AC / Heater
                                </p>
                            </div>
                            <h4>Price: ${car.price} / Day</h4>

                        </div>

                    </div>

                    <div className="row w-100 mt-3">

                        <div className="col-md-12 bg-dark text-white rounded p-4" >
                            <h2 className="mb-4 text-center">Car features</h2>


                            <div className="d-flex justify-content-around">
                                <div className="">
                                    <p>
                                        <FaFeather /> Multi-zone A/C
                                    </p>
                                    <p>
                                        <FaFeather /> Heated front seats
                                    </p>
                                    <p>
                                        <FaFeather /> Andriod Auto
                                    </p>
                                    <p>
                                        <FaFeather /> Navigation system
                                    </p>
                                </div>
                                <div className="">
                                    <p>
                                        <FaFeather /> Memory seat
                                    </p>
                                    <p>
                                        <FaFeather /> Bluetooth
                                    </p>
                                    <p>
                                        <FaFeather /> Adaptive Cruise Control
                                    </p>
                                    <p>
                                        <FaFeather /> Keyless Entry
                                    </p>
                                </div>




                            </div>

                        </div>

                    </div>




                </div>
                <div className="bg-dark text-white" style={styles.rightSection}>
                    <h3 style={styles.heading}>Booking Form</h3>
                    <div style={styles.divider} />
                    <form onSubmit={handleSubmit}>
                        {/* Rental Type */}
                        <div style={styles.section}>
                            <p>Rental Type</p>
                            <label>
                                <input
                                    required
                                    name="rentalType"
                                    className="me-2"
                                    type="radio"
                                    value="Day"
                                    checked={rentalType === "Day"}
                                    onChange={(e) => setRentalType(e.target.value)}
                                />
                                Day
                            </label>
                            <label style={{ marginLeft: "10px" }}>
                                <input
                                    required
                                    name="rentalType"
                                    className="me-2"
                                    type="radio"
                                    value="Hour"
                                    checked={rentalType === "Hour"}
                                    onChange={(e) => setRentalType(e.target.value)}
                                />
                                Hour
                            </label>
                        </div>

                        {/* Pickup Location */}
                        <div style={styles.section}>
                            <p>Pickup Location</p>
                            <select
                                required
                                className="form-select"
                                value={pickupLocation}
                                onChange={(e) => setPickupLocation(e.target.value)}
                            >
                                <option value="">Select Location</option>
                                <option value="Sri Jayewardenepura Kotte">Sri Jayewardenepura Kotte</option>
                                <option value="Colombo">Colombo</option>
                                <option value="Kandy">Kandy</option>
                                <option value="Colombo 07">Colombo 07</option>
                            </select>
                        </div>

                        {/* Dropoff Location */}
                        <div style={styles.section}>
                            <p>Dropoff Location</p>
                            <select
                                required
                                className="form-select"
                                value={dropoffLocation}
                                onChange={(e) => setDropoffLocation(e.target.value)}
                            >
                                <option value="">Select Location</option>
                                <option value="Colombo 07">Colombo 07</option>
                                <option value="Homagama">Homagama</option>
                                <option value="Colombo 03">Colombo 03</option>
                                <option value="Colombo 06">Colombo 06</option>
                            </select>
                        </div>

                        {/* Pickup Date & Time */}
                        <div style={styles.section}>
                            <p>Pickup Date</p>
                            <div style={styles.dateTimeRow}>
                                <input
                                    required
                                    type="date"
                                    style={styles.input}
                                    value={pickupDate}
                                    onChange={(e) => setPickupDate(e.target.value)}
                                />
                                <input
                                    required
                                    type="time"
                                    style={styles.input}
                                    value={pickupTime}
                                    onChange={(e) => setPickupTime(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Drop-off Date & Time */}
                        <div style={styles.section}>
                            <p>Drop-off Date</p>
                            <div style={styles.dateTimeRow}>
                                <input
                                    required
                                    type="date"
                                    style={styles.input}
                                    value={dropoffDate}
                                    onChange={(e) => setDropoffDate(e.target.value)}
                                />
                                <input
                                    required
                                    type="time"
                                    style={styles.input}
                                    value={dropoffTime}
                                    onChange={(e) => setDropoffTime(e.target.value)}
                                />


                            </div>
                        </div>

                        {/* Deposit Option */}
                        <div style={styles.section}>
                            <p>Deposit Option</p>
                            <label>
                                <input
                                    required
                                    className="me-2"
                                    type="radio"
                                    value="Pay Deposit"
                                    checked={depositOption === "Pay Deposit"}
                                    onChange={(e) => setDepositOption(e.target.value)}
                                />
                                Pay Deposit
                            </label>
                            <label style={{ marginLeft: "10px" }}>
                                <input
                                    required
                                    type="radio"
                                    className="me-2"
                                    value="Full Amount"
                                    checked={depositOption === "Full Amount"}
                                    onChange={(e) => setDepositOption(e.target.value)}
                                />
                                Full Amount
                            </label>
                        </div>

                        {/* Buttons */}
                        <div style={styles.buttonRow}>
                            <button type="submit" style={styles.bookingButton}>
                                Booking
                            </button>
                            <button type="button" style={styles.enquiryButton} onClick={handleEnquiry}>
                                Enquiry Us
                            </button>
                        </div>
                    </form>
                </div>

            </div>

        </div >

    );
};

const styles = {
    container: {
        display: "flex",
        flexDirection: "row",
        height: "100vh",
        overflow: "hidden",
    },
    leftSection: {
        flex: 1,
        overflowY: "scroll",
        backgroundColor: "#0F0F24",
        padding: "20px",
    },

    rightSection: {
        top: "0",
        borderRadius: "8px",
        width: "350px",
        padding: "20px",
        borderLeft: "1px solid #ccc",
        position: "sticky",
        height: "100vh",
    },
    heading: {
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        marginBottom: "10px",
    },
    divider: {
        height: "2px",
        backgroundColor: "#FFA500",
        marginBottom: "20px",
    },
    section: {
        marginBottom: "15px",
    },
    input: {
        width: "100%",
        padding: "8px",
        marginBottom: "5px",
        border: "1px solid #ccc",
        borderRadius: "4px",
        fontSize: "14px",
    },
    dateTimeRow: {
        display: "flex",
        gap: "10px",
    },
    buttonRow: {
        display: "flex",
        justifyContent: "space-between",
        marginTop: "20px",
    },
    bookingButton: {
        flex: 1,
        backgroundColor: "#FFA500",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "10px",
        cursor: "pointer",
        marginRight: "5px",
    },
    enquiryButton: {
        flex: 1,
        backgroundColor: "#007B8F",
        color: "#fff",
        border: "none",
        borderRadius: "4px",
        padding: "10px",
        cursor: "pointer",
        marginLeft: "5px",
    },
    content: {
        padding: "10px",
    },
    selector: {
        display: "flex",
        flexDirection: "column",
        gap: "20px",
    },
    selected: {
        marginTop: "20px",
        padding: "10px",
        backgroundColor: "#e8f4f8",
        borderRadius: "8px",
    },
};

export default App;
