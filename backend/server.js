const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
require('dotenv').config();
const userRoutes = require('./routes/user'); // Import the user routes
const eventRoutes = require('./routes/event'); // Import the event routes
const bookingRoutes = require('./routes/booking'); // Import the booking routes
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
app.use('/api/events', eventRoutes);
app.use('/api/bookings', bookingRoutes);

// Connect to DB
connectDB();

// Start server
app.listen(process.env.PORT, () => {
  console.log(`Server running on http://localhost:${process.env.PORT}`);
});