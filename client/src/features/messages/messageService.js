import axios from 'axios';

const API_URL = 'http://localhost:3000/api/user/';

// Get user data
const getUserData = async (id) => {
    const response = await axios.get(`${API_URL}${id}`);
    return response.data;
};

const messageService = {
    getUserData
};

export default messageService;
