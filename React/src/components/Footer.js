// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-dark text-light pt-5 pb-3">
            <div className="container">
                <div className="row">
                    {/* About Us Section */}
                    <div className="col-md-4 mb-4">
                        <h5>About Us</h5>
                        <p>
                            At CarRentalPro, we provide a wide range of vehicles for your travel needs.
                            Whether you're looking for luxury, economy, or family-friendly cars, we've got you covered.
                        </p>
                    </div>

                    {/* Quick Links Section */}
                    <div className="col-md-4 mb-4">
                        <h5>Quick Links</h5>
                        <ul className="list-unstyled">
                            <li><a href="/" className="text-light text-decoration-none">Home</a></li>
                            <li><a href="/login" className="text-light text-decoration-none">Login</a></li>
                            <li><a href="/register" className="text-light text-decoration-none">Register</a></li>
                            <li><a href="#cars" className="text-light text-decoration-none">Available Cars</a></li>
                        </ul>
                    </div>

                    {/* Contact Information */}
                    <div className="col-md-4 mb-4">
                        <h5>Contact Us</h5>
                        <ul className="list-unstyled">
                            <li><i className="bi bi-geo-alt-fill"></i> 123 Car Street, Auto City</li>
                            <li><i className="bi bi-envelope-fill"></i> support@carrentalpro.com</li>
                            <li><i className="bi bi-phone-fill"></i> +1-234-567-890</li>
                        </ul>
                        {/* Social Media Links */}
                        <div className="mt-3">
                            <a href="#" className="text-light me-3"><i className="bi bi-facebook"></i></a>
                            <a href="#" className="text-light me-3"><i className="bi bi-twitter"></i></a>
                            <a href="#" className="text-light me-3"><i className="bi bi-instagram"></i></a>
                            <a href="#" className="text-light"><i className="bi bi-linkedin"></i></a>
                        </div>
                    </div>
                </div>
                <hr className="bg-light" />
                <div className="text-center">
                    <p className="mb-0">&copy; {new Date().getFullYear()} CarRentalPro. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
