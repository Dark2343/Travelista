// models/event.js
const mongoose = require('mongoose');

// Define the schema for the Event
const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  image: {
    type: String, // Assuming image is stored as a URL or file path
    required: true,
  },
  location: {
    type: String,
    required: true,
    trim: true,
  },
  startDate: {
    type: Date,
    required: true,
  },
  endDate: {
    type: Date,
    required: false, // Optional field for event end date
  },
  time: {
    type: String, // You can store the time as a string (e.g., '7:00 PM')
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    required: true,
    trim: true,
  },
  tags: {
    type: [String], // Array of tags (e.g., ['music', 'concert'])
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Create and export the model
const Event = mongoose.model('Event', eventSchema);

module.exports = Event; 
