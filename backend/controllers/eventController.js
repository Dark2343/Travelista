// controllers/eventController.js
const Event = require('../models/event');
const Booking = require('../models/booking');

// Create a new event (Admin only)
exports.createEvent = async (req, res) => {
  try {
    const event = new Event(req.body);
    await event.save();
    res.status(201).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Get all events (Public)
exports.getAllEvents = async (req, res) => {
  try {
    const upcomingOnly = req.query.upcomingOnly === 'true'; // Check if flag is set
    
    const totalEvents = await Event.countDocuments(upcomingOnly ? { status: 'upcoming' } : {});
    const limit = req.query.limit ? parseInt(req.query.limit) : totalEvents; // Get the limit from query params
    const page = parseInt(req.query.page) || 1; // Get the page number from query params
    const skip = (page - 1) * limit; // Calculate the number of documents to skip

    const events = await Event.find(upcomingOnly ? { status: 'upcoming' } : {}) // Filter events by status
    .sort({ createdAt: -1 }) // Sort events by createdAt in descending order
    .skip(skip) // Skip the documents
    .limit(limit); // Limit the number of documents returned

    res.status(200).json({
      events,
      totalEvents,
      page,
      totalPages: Math.ceil(totalEvents / limit), // Calculate total pages
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Get event by ID (Public)
exports.getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Update event (Admin only)
exports.updateEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }
    res.status(200).json(event);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete event (Admin only)
exports.deleteEvent = async (req, res) => {
  try {
    const event = await Event.findByIdAndDelete(req.params.id);
    if (!event) {
      return res.status(404).json({ error: 'Event not found' });
    }

    // Optionally, you can also delete associated bookings here
    await Booking.deleteMany({ event: req.params.id });

    res.status(200).json({ message: 'Event deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
