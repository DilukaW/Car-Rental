// src/components/BookingConfirmation.js
import React, { useState, useEffect } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";
import { addBooking } from "../services/api";


const BookingConfirmation = () => {
    const { carId } = useParams();
    const navigate = useNavigate(); // Get car name from URL
    const { search } = useLocation();
    const queryParams = new URLSearchParams(search);


    const [upload, setUpload] = useState(true);

    const formData = {
        rentalType: queryParams.get('rentalType'),
        pickupLocation: queryParams.get('pickupLocation'),
        dropoffLocation: queryParams.get('dropoffLocation'),
        pickupDate: queryParams.get('pickupDate'),
        pickupTime: queryParams.get('pickupTime'),
        dropoffDate: queryParams.get('dropoffDate'),
        dropoffTime: queryParams.get('dropoffTime'),
        depositOption: queryParams.get('depositOption'),
        price: queryParams.get('price'),
    };


    useEffect(() => {
        console.log("Received Form Data:", formData);
        // eslint-disable-next-line
        if (upload) {
            // eslint-disable-next-line
            addData();
            setUpload(false)
        }

        // eslint-disable-next-line
    }, [carId, formData]);

    const addData = async () => {
        try {

            await addBooking(
                carId,
                localStorage.getItem('userId'),
                formData.rentalType,
                formData.pickupLocation,
                formData.dropoffLocation,
                formData.pickupDate,
                formData.pickupTime,
                formData.dropoffDate,
                formData.dropoffTime,
                formData.depositOption,
                formData.price);

        } catch (error) {
            console.error('Error adding booking data:', error);
        }
    };

    const handleBooking = () => {
        const bookingId = carId;
        const price = formData.rentalType === "Day" ? formData.price : (formData.price / 24).toFixed(2)
        navigate(`/checkout?bookingId=${bookingId}&price=${price}`);
    };

    return (
        <div className="homepage text-white" style={{ backgroundColor: "#0F0F24", }}>

            <div className="container" >
                <div className="table-responsive col-md-10 my-5">
                    <table className="table table-dark">
                        <thead>
                            <tr class="table-active">
                                <th colSpan={2} scope="col">Product</th>
                                <th scope="col">Price</th>
                                <th scope='col'>Duration</th>
                                <th scope="col">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td >Pickup Location:</td>
                                <td colSpan={4}>{formData.pickupLocation}</td>

                            </tr>
                            <tr>
                                <td> Pick-Off Location:</td>
                                <td colSpan={4}>{formData.dropoffLocation}</td>


                            </tr>
                            <tr>
                                <td>Pick Up Date:</td>
                                <td>{formData.pickupDate}</td>
                                <td>$ {formData.price}</td>
                                <td>{formData.rentalType}</td>
                                <td>$ {formData.rentalType === "Day" ? formData.price : (formData.price / 24).toFixed(2)}</td>


                            </tr>
                            <tr>
                                <td>Drop Off Date:</td>
                                <td colSpan={4}> {formData.dropoffDate}</td>
                            </tr>
                            <tr>
                                <td>Vehicle ID:</td>
                                <td colSpan={4}>{carId}</td>
                            </tr>
                            <tr className='text-center'>
                                <td colSpan={5}><button className='btn btn-warning text-white mt-4' onClick={handleBooking}>
                                    <FaCartPlus /> Proceed To Checkout
                                </button></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div >

    );
};

export default BookingConfirmation;
