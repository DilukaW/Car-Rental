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

// Function to a new car with the backend
export const addVehicle = async (name, type, fuel, price, features, seats) => {
    try {
        const response = await axios.post(`http://localhost:8081/api/cars/add`, {

            features: features,
            fuel: fuel,
            name: name,
            price: price,
            seats: seats,
            type: type,

        });
        return response;
    } catch (error) {

        throw new Error(error.response?.data?.message || error.message);
    }
};



// Function to delete a car with the backend
export const deleteCar = async (carId) => {
    try {
        const response = await axios.delete(`http://localhost:8081/api/cars/delete/${carId}`);
        return response;
    } catch (error) {
        console.error('Error in deleting car:', error);
        throw error;
    }
};

export const fetchDrivers = async () => {
    try {
        const response = await axios.get(`http://localhost:8081/api/drivers`);
        return response.data;
    } catch (error) {
        console.error('Error fetching drivers:', error);
        throw error;
    }
};

// Function to a new driver with the backend
export const addDriver = async (name, email, contact) => {
    try {
        const response = await axios.post(`http://localhost:8081/api/drivers/add`, {

            name: name,
            email: email,
            contact: contact

        });
        return response;
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

// Function to delete a car with the backend
export const deleteDriver = async (driverId) => {
    try {
        const response = await axios.delete(`http://localhost:8081/api/drivers/delete/${driverId}`);
        return response;
    } catch (error) {
        console.error('Error in deleting driver:', error);
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

// Function to update user details with the backend
export const updateUserById = async (userId, updatedUser) => {
    try {
        const response = await axios.put(`http://localhost:8081/api/users/${userId}`, updatedUser, {
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Error updating user:', error);
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

// Function to log in using a token with the backend
export const logoutUser = async () => {
    try {
        const response = await axios.post('http://localhost:8080/api/logout', {
            withCredentials: true,
        });
        return response; // Axios automatically parses JSON responses
    } catch (error) {
        throw new Error(error.response?.data?.message || error.message);
    }
};

