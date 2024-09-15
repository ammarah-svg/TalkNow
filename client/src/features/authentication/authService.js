import axios from 'axios';

const base_url = 'http://localhost:3000/api/user';

// Function to handle user registration
const regUser = async (userData) => {
    try {
        const response = await axios.post(`${base_url}/register`, userData);
        return response.data; 
    } catch (error) {
        // Throw a custom error with message and status
        throw {
            message: error.response?.data?.message || 'Registration failed',
            status: error.response?.status || 500
        };
    }
};

// Function to handle user login
const logUser = async (userData) => {
    try {
        const response = await axios.post(`${base_url}/login`, userData);
        return response.data; 
    } catch (error) {
        // Throw a custom error with message and status
        throw {
            message: error.response?.data?.message || 'Login failed',
            status: error.response?.status || 500
        };
    }
};

// Function to get all users (ensure this is secure and authorized)
const getUsers = async () => {
    try {
        const response = await axios.get(`${base_url}/get-users`);
        return response.data;
    } catch (error) {
        // Throw a custom error with message and status
        throw {
            message: error.response?.data?.message || 'Failed to fetch users',
            status: error.response?.status || 500
        };
    }
};




const logout = () => {
   
    localStorage.removeItem('user'); // or sessionStorage
  };

export const authService = {
    regUser,
    logUser,
    getUsers,
    logout
};
