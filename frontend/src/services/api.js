// src/api.js
import axios from 'axios';

// Import the environment variables
const apiURL = import.meta.env.VITE_API_URL;
// Create an Axios instance
const api = axios.create({
  baseURL: `${apiURL}/api`, // Replace this with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;