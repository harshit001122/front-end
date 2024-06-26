import axios from 'axios';
import Cookies from 'js-cookie';  // Ensure you have this installed: npm install js-cookie

const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_QUADB_TECH_API
});

// Add a request interceptor to the axios instance
axiosInstance.interceptors.request.use(
    (config) => {
        // Get the token from cookies or any other storage mechanism
        const token = Cookies.get('token');

        // If the token exists, add it to the Authorization header
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => {
        // Handle the error
        return Promise.reject(error);
    }
);

export default axiosInstance;
