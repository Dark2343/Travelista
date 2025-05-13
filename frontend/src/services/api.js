// src/api.js
import axios from 'axios';

// Create an Axios instance
const api = axios.create({
  baseURL: 'http://localhost:5000/api', // Replace this with your API base URL
  headers: {
    'Content-Type': 'application/json',
  },
});

export default api;