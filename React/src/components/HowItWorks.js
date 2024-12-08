// How It Works Section Component
const HowItWorks = () => {
    return (
        <div className="how-it-works py-5">
            <div className="container text-center">
                <h2 className="fw-bold mb-4">How it Works</h2>
                <div className="row">
                    <div className="col-md-4">
                        <div className="step">
                            <div className="icon mb-3">
                                <i className="bi bi-geo-alt fs-1"></i>
                            </div>
                            <h5>Choose Location</h5>
                            <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="step">
                            <div className="icon mb-3">
                                <i className="bi bi-calendar2-date fs-1"></i>
                            </div>
                            <h5>Pick-Up Date</h5>
                            <p>Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor.</p>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="step">
                            <div className="icon mb-3">
                                <i className="bi bi-car-front fs-1"></i>
                            </div>
                            <h5>Book Your Car</h5>
                            <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HowItWorks;