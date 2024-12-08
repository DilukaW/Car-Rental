const Navbar = () => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark">
            <div className="container">
                <a className="navbar-brand" href="#">CarRentalPro</a>
                <button
                    className="navbar-toggler"
                    type="button"
                    data-toggle="collapse"
                    data-target="#navbarNav"
                    aria-controls="navbarNav"
                    aria-expanded="false"
                    aria-label="Toggle navigation"
                >
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        <li className="nav-item">
                            <a className="nav-link" href="#">Rent</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Share</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Ride</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Service</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Contact</a>
                        </li>
                        <li className="nav-item">
                            <a className="nav-link" href="#">Log In</a>
                        </li>
                        <li className="nav-item">
                            <a className="btn btn-primary" href="#">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    );
};
export default Navbar;
