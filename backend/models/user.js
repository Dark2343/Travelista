// models/user.js
const mongoose = require('mongoose');

// Define the schema for the Event
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String, // Assuming image is stored as a URL or file path
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  }
});

// Create and export the model
// const Event = mongoose.model('Event', eventSchema);

// module.exports = Event; 
