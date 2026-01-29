import axios from 'axios';


const axiosInstance = axios.create({
    baseURL: 'https://697bbadb889a1aecfeb0abd9.mockapi.io',
    timeout: 10000,
    headers: {
        'Content-Type': 'application/json',
    },
});
export default axiosInstance;