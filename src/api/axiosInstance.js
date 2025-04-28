import axios from 'axios';
import { useAuth } from '../context/AuthContext';

// Create custom axios instance
const axiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000/api',
});

// Interceptor: handle 401 Unauthorized globally
axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Unauthorized - token expired
            localStorage.removeItem('user');
            localStorage.removeItem('token');
            window.location.href = '/'; // Redirect to login
        }
        return Promise.reject(error);
    }
);

export default axiosInstance;
