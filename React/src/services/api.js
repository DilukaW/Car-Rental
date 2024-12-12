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
