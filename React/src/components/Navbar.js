import React, { useState, useEffect } from 'react';
import { fetchUsers } from '../services/api';
import { getUserById } from '../services/api'
import profile from '../Images/profile.png'
const Navbar = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Check if userId exists in localStorage
        const userId = localStorage.getItem('userId');
        if (userId) {
            setIsLoggedIn(true);
            const fetchData = async () => {
                try {
                    const userData = await getUserById(userId);
                    setUser(userData);
                    console.log(userData);
                } catch (error) {
                    console.error('Error fetching user data:', error);
                }
            };
            fetchData();
        }
    }, []);

    return (
        <div className="homepage text-white" style={{ backgroundColor: "#0F0F24" }}>
            <nav className="navbar navbar-expand-lg navbar-dark">
                <div className="container">
                    <a className="navbar-brand" href="/">CarRentalPro</a>
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
                            {isLoggedIn ? (
                                <li className="nav-item d-flex align-items-center">
                                    <a className="" to="/dashboard" href="/dashboard">
                                        <img
                                            src={user?.profileImage || profile} // Default profile image if none exists
                                            alt={`${user?.name}'s profile`}
                                            className="rounded-circle ms-2"
                                            style={{ width: '40px', height: '40px', marginRight: '10px' }}
                                        />
                                    </a>
                                    <li className="nav-item">
                                        <a className="nav-link" to="/dashboard" href="/dashboard">{user?.displayName || 'User'}</a>
                                    </li>
                                </li>
                            ) : (
                                <>
                                    <li className="nav-item">
                                        <a className="nav-link" to="/login" href="/login">Log In</a>
                                    </li>
                                    <li className="nav-item">
                                        <a className="btn btn-primary" to="/register" href="/register">Sign Up</a>
                                    </li>
                                </>
                            )}
                        </ul>
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default Navbar;
