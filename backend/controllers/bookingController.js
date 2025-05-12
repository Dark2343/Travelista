const Booking = require('../models/booking');
const Event = require('../models/event');
const User = require('../models/user');

// Create a booking
exports.createBooking = async (req, res) => {
  const { eventId } = req.body;

  try {
    // Check if event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Create a new booking
    const booking = new Booking({
      user: req.user.id, // User ID from the JWT token
      event: eventId,
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all bookings (admin only)
exports.getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('user event');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get bookings for a specific user
exports.getUserBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id }).populate('event');
    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

/*
// (Optional) Get all bookings grouped by user, for admin
exports.getGroupedBookings = async (req, res) => {
  try {
    const bookings = await Booking.find().populate('event'); // populate event field only

    const groupedBookings = bookings.reduce((acc, booking) => {
      if (!acc[booking.user]) {
        acc[booking.user] = [];
      }
      acc[booking.user].push(booking);
      return acc;
    }, {});

    // Now retrieve all the user data in a single query
    const userIds = Object.keys(groupedBookings); // Getting all user IDs
    const users = await User.find({ 'id': { $in: userIds } });

    // Add user data to each booking group
    Object.keys(groupedBookings).forEach(userId => {
      const user = users.find(u => u.id.toString() === userId);
      groupedBookings[userId].forEach(booking => {
        booking.user = user; // Attach full user data to the bookings
      });
    });

    res.status(200).json(groupedBookings); // Return the grouped bookings by user
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
*/