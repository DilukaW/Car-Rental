import React from 'react';

const Contact = () => {
    return (
        <div className="homepage text-white" style={{ backgroundColor: "#0F0F24" }}>
            <div className="contact-page">
                <section className="contact-header text-center py-5">
                    <h1 className="display-4">Contact Us</h1>
                    <p className="lead">We'd love to hear from you. Reach out to us with any questions or feedback.</p>
                </section>

                <section className="contact-container container py-5">
                    <div className="row">
                        {/* Contact Form */}
                        <div className="col-lg-6 mb-4">
                            <h2>Send a Message</h2>
                            <p className="mb-4">Fill out the form below and our team will get back to you as soon as possible.</p>
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input type="text" id="name" className="form-control" placeholder="Enter your name" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" id="email" className="form-control" placeholder="Enter your email" required />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="message" className="form-label">Message</label>
                                    <textarea id="message" className="form-control" rows="5" placeholder="Your message" required></textarea>
                                </div>
                                <button type="submit" className="btn btn-primary w-100">Send Message</button>
                            </form>
                        </div>

                        {/* Contact Information */}
                        <div className="col-lg-6 mb-4">
                            <h2>Contact Information</h2>
                            <p className="mb-4">Reach out to us via the contact details below or follow us on social media.</p>
                            <ul className="list-unstyled">
                                <li className="mb-3">
                                    <i className="bi bi-geo-alt-fill text-white me-2"></i>
                                    123 Car Street, Colombo, Sri Lanka
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-envelope-fill text-white me-2"></i>
                                    support@CarPro.com
                                </li>
                                <li className="mb-3">
                                    <i className="bi bi-phone-fill text-white me-2"></i>
                                    +94-234-5674
                                </li>
                            </ul>
                            <h4>Follow Us</h4>
                            <div>
                                <a href="#" className="text-white me-3 fs-4"><i className="bi bi-facebook"></i></a>
                                <a href="#" className="text-white me-3 fs-4"><i className="bi bi-twitter"></i></a>
                                <a href="#" className="text-white me-3 fs-4"><i className="bi bi-instagram"></i></a>
                                <a href="#" className="text-white fs-4"><i className="bi bi-linkedin"></i></a>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </div>
    );
};

export default Contact;
