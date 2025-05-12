const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const eventRoutes = require('./routes/event'); // Import the event routes
const userRoutes = require('./routes/user'); // Import the user routes

// Middleware
app.use(cors());
app.use(express.json());

// Use the event routes
app.use('/api/events', eventRoutes);
// Use the user routes
app.use('/api/users', userRoutes);

// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));