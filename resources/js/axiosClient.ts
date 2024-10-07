import axios from 'axios';
import { Inertia } from '@inertiajs/inertia';

const axiosClient = axios.create({
    baseURL: 'https://8l79w9tda9.execute-api.eu-central-1.amazonaws.com/dev', // Your API base URL
    timeout: 10000, // Timeout for requests
    headers: {
        'Content-Type': 'application/json', // Set JSON header globally
    },
});

// Intercept Inertia requests and add Authorization header
Inertia.on('start', (event) => {
    const token = localStorage.getItem('auth_token');
    if (token) {
        event.detail.visit.headers['Authorization'] = `Bearer ${token}`;
    }
});

// Request interceptor to add the Authorization header to axios requests
axiosClient.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('auth_token');
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

// Response interceptor to handle errors globally
axiosClient.interceptors.response.use(
    (response) => {
        return response;
    },
    (error) => {
        if (error.response && error.response.status === 401) {
            localStorage.removeItem('auth_token');
            Inertia.visit('/login'); // Use Inertia for navigation
        }
        return Promise.reject(error);
    }
);

export default axiosClient;
