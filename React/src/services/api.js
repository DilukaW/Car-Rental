import axios from 'axios';

const BASE_URL = 'http://localhost:8081/api';

export const fetchCars = async () => {
    try {
        const response = await axios.get(`${BASE_URL}/cars`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};

// Function to register a new user with the backend
export const getUserById = async (userId) => {
    try {
        const response = await axios.get(`http://localhost:8081/api/users/${userId}`);
        return response.data;
    } catch (error) {
        console.error('Error fetching cars:', error);
        throw error;
    }
};

// Function to register a new user with the backend
export const registerWithBackend = async (email, password, displayName, street, city, contactNumber) => {
    try {
        const response = await axios.post('http://localhost:8081/api/register', {
            email: email,
            password: password,
            displayName: displayName,
            role: 'user',
            street: street,
            city: city,
            contact: contactNumber

        });
        return response;
    } catch (error) {

        throw new Error(error.response?.data?.message || error.message);
    }
};

// Function to log in using a token with the backend
export const loginWithBackend = async (email, password) => {
    try {
        const response = await axios.post('http://localhost:8080/api/auth/login', {
            email: email,
            password: password
        });
        return response.data; // Axios automatically parses JSON responses
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};
