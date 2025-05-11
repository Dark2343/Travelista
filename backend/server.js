const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();
const eventRoutes = require('./routes/event'); // Import the event routes

// Middleware
app.use(cors());
app.use(express.json());

// Use the event routes
app.use('/api/events', eventRoutes);  // Mount the router on a specific URL path

// Sample route
app.get('/', (req, res) => res.send('API is running'));


// Connect to DB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  })
  .catch(err => console.error(err));