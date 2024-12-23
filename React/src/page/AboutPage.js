import React from 'react';
import logo from "../Images/hero.png"

const About = () => {
    return (
        <div className="homepage text-white" style={{ backgroundColor: "#0F0F24" }}>
            <div className="about-page">
                {/* Hero Section */}
                <section className="about-hero text-center text-light py-5">
                    <h1 className="display-4">Welcome to CarPro</h1>
                    <p className="lead">Your trusted partner in seamless car rentals.</p>
                </section>

                {/* About Section */}
                <section className="about-container container py-5">
                    <div className="row">
                        <div className="col-lg-6 mb-4">
                            <h2>Who We Are</h2>
                            <p>
                                At CarPro, we are committed to revolutionizing the car rental experience. Our mission is to provide
                                convenient, reliable, and affordable vehicle solutions to suit your unique travel needs.
                            </p>
                        </div>
                        <div className="col-lg-6 mb-4">
                            <img
                                src={logo}
                                alt="About CarPro"
                                className="img-fluid rounded shadow"
                            />
                        </div>
                    </div>
                </section>

                {/* Mission and Values Section */}
                <section className="values-container text-light py-5">
                    <div className="container">
                        <div className="row text-center">
                            <div className="col-md-4 mb-4">
                                <h3>Our Mission</h3>
                                <p>
                                    To empower every journey with trusted and flexible car rental solutions that deliver value and convenience.
                                </p>
                            </div>
                            <div className="col-md-4 mb-4">
                                <h3>Our Vision</h3>
                                <p>
                                    To become the global leader in car rental services, setting the standard for quality, sustainability, and innovation.
                                </p>
                            </div>
                            <div className="col-md-4 mb-4">
                                <h3>Our Values</h3>
                                <p>
                                    Integrity, customer focus, innovation, and sustainability form the foundation of everything we do at CarPro.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Team Section */}
                <section className="team-container container py-5">
                    <h2 className="text-center mb-5">Meet Our Team</h2>
                    <div className="row text-center">
                        <div className="col-md-4 mb-4">
                            <img
                                src="https://i.pravatar.cc/300"
                                alt="Team Member"
                                className="rounded-circle mb-3 shadow"
                            />
                            <h5>Diluka Wijesinghe</h5>
                            <p className="">CEO & Founder</p>
                        </div>
                        <div className="col-md-4 mb-4">
                            <img
                                src="https://i.pravatar.cc/300"
                                alt="Team Member"
                                className="rounded-circle mb-3 shadow"
                            />
                            <h5>Jane Smith</h5>
                            <p className="">Chief Technology Officer</p>
                        </div>
                        <div className="col-md-4 mb-4">
                            <img
                                src="https://i.pravatar.cc/300"
                                alt="Team Member"
                                className="rounded-circle mb-3 shadow"
                            />
                            <h5>Mike Johnson</h5>
                            <p className="">Head of Marketing</p>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default About;
