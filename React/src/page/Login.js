// src/components/Login.js
import { loginWithBackend } from '../services/api';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase';
import { useEffect, useState } from 'react';

const Login = () => {

    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role: 'user', // Default role is 'user'
    });
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                localStorage.setItem('userId', user.uid);
                const userId = localStorage.getItem('userId');
                console.log(userId)
                navigate('/dashboard');
                setIsLoggedIn(true);

                console.log('User is logged in:', user);
            } else {
                setIsLoggedIn(false);
                console.log('User is not logged in.');
            }
        });

        return () => unsubscribe(); // Cleanup subscription on component unmount
    }, []);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {

            await signInWithEmailAndPassword(auth, formData.email, formData.password);
            alert('Login successful!');
            // const response = await loginWithBackend(formData.email, formData.password);

            // if (response.data) {
            //     // Store token or user data if required
            //     localStorage.setItem('token', response.data.token); // Optional
            //     alert('Login successful!');
            //     navigate('/dashboard'); // Redirect to a protected route
            // }
        } catch (error) {
            console.error('Login error:', error.message);

            alert(`Login failed: ${error.response?.data || error.message}`);
        }

        // Add logic to handle login functionality based on formData.role
    };

    return (
        <div className="homepage" style={{ backgroundColor: "#0F0F24", minHeight: "100vh" }}>
            <div className="container d-flex justify-content-center">
                <div className="p-4 rounded shadow-lg bg-white my-5" style={{ maxWidth: '400px', width: '100%' }}>
                    <h2 className="text-center mb-4">Login</h2>
                    <form onSubmit={handleSubmit}>
                        <div className="mb-3">
                            <label htmlFor="role" className="form-label">Role</label>
                            <select
                                id="role"
                                name="role"
                                className="form-select"
                                value={formData.role}
                                onChange={handleChange}
                                required
                            >
                                <option value="user">User</option>
                                <option value="admin">Admin</option>
                            </select>
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

                        <div className="text-center mt-4">
                            <button type="submit" className="btn btn-primary btn-sm">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
