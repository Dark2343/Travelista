// routes/booking.js
const express = require('express');
const { protect, isAdmin } = require('../middlewares/protect');
const { createBooking, getAllBookings, getUserBookings } = require('../controllers/bookingController');
const router = express.Router();

// Booking Routes
router.post('/', protect, createBooking);
router.get('/', protect, isAdmin, getAllBookings);
router.get('/user', protect, getUserBookings);

module.exports = router;
