// src/components/Register.js
import React, { useState } from 'react';
import { registerWithBackend } from '../services/api'// Adjust the path to your API functions file

import { useNavigate } from 'react-router-dom';

const Register = () => {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        displayName: '',
        email: '',
        password: '',
        confirmPassword: '',
        street: '',
        city: '',
        contactNumber: '',
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }

        try {
            const response = await registerWithBackend(formData.email,
                formData.password,
                formData.displayName,
                formData.street,
                formData.city,
                formData.contactNumber);

            if (response.data) {
                alert('Registration successful!');
                console.log('Server Response:', response.data);

                // Redirect to login page
                navigate('/login');
            }
        } catch (error) {
            console.error('Registration error:', error.message);
            alert(`Registration failed: ${error.response?.data || error.message}`);
        }
        // e.preventDefault();
        // if (formData.password !== formData.confirmPassword) {
        //     alert('Passwords do not match!');
        //     return;
        // }

        // try {

        //     await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        //     const user = auth.currentUser;
        //     console.log(user)
        //     alert('Registration successful!');
        //     navigate('/login');

        // } catch (error) {
        //     console.error('Registration error:', error.message);
        //     alert(`Registration failed: ${error.message}`);
        // }
    };

    return (
        <div className="homepage" style={{ backgroundColor: "#0F0F24", minHeight: "100vh" }}>
            <div className="container d-flex justify-content-center">
                <div className="p-4 rounded shadow-lg bg-white my-5" style={{ maxWidth: '800px', width: '100%' }}>
                    <h2 className="text-center mb-4">Register</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="row">
                            {/* Column 1 */}
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="displayName" className="form-label">Username</label>
                                    <input
                                        type="text"
                                        id="displayName"
                                        name="displayName"
                                        className="form-control"
                                        value={formData.displayName}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-control"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="password" className="form-label">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        name="password"
                                        className="form-control"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="form-control"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>

                            {/* Column 2 */}
                            <div className="col-md-6">
                                <div className="mb-3">
                                    <label htmlFor="street" className="form-label">Street</label>
                                    <input
                                        type="text"
                                        id="street"
                                        name="street"
                                        className="form-control"
                                        value={formData.street}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="city" className="form-label">City</label>
                                    <input
                                        type="text"
                                        id="city"
                                        name="city"
                                        className="form-control"
                                        value={formData.city}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="contactNumber" className="form-label">Contact Number</label>
                                    <input
                                        type="text"
                                        id="contactNumber"
                                        name="contactNumber"
                                        className="form-control"
                                        value={formData.contactNumber}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary btn-sm">Register</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;
