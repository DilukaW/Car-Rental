import logo from "../Images/hero.png"

const HeroBanner = () => {

    const rent = () => {
        window.location.href = "/rent"
    }
    const learn = () => {
        window.location.href = "/about"
    }

    const handleFormSubmit = (e) => {
        e.preventDefault(); // Prevent page reload
        window.location.href = "/rent"
    };
    return (
        <header className="hero-section py-5">
            <div className="container">
                <div className="row align-items-center">
                    {/* Text Content */}
                    <div className="col-lg-6 text-center text-lg-start">
                        <h1 className="display-4 fw-bold">WE RENT THE HIGHEST CALIBER AUTOMOBILES</h1>
                        <p className="lead">Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.</p>
                        <div className="d-flex justify-content-center justify-content-lg-start mt-4">
                            <button className="btn btn-primary me-3" onClick={rent}>Rent Now</button>
                            <button className="btn btn-secondary" onClick={learn}>Learn More</button>
                        </div>
                    </div>

                    {/* Image Section */}
                    <div className="col-lg-6 mt-4 mt-lg-0 text-center">
                        <img
                            src={logo}
                            alt="Luxury car"
                            className="img-fluid rounded"
                        />
                    </div>
                </div>

                {/* Search Bar */}
                <div className="search-bar bg-dark text-white p-4 rounded mt-5">
                    <form onSubmit={handleFormSubmit}>
                        <div className="row">

                            <div className="col-md-4">
                                <input type="text" required className="form-control" placeholder="Enter your location here" />
                            </div>
                            <div className="col-md-3">
                                <input type="date" required className="form-control" placeholder="Pick-Up Date" />
                            </div>
                            <div className="col-md-3">
                                <input type="date" required className="form-control" placeholder="Return Date" />
                            </div>
                            <div className="col-md-2">
                                <button className="btn btn-primary w-100" type="submit">Search</button>
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        </header >
    );
};

export default HeroBanner;
