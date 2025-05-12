const express = require('express');
const router = express.Router();
const { protect, isAdmin } = require('../middlewares/protect'); // ⬅️ Import the protect & isAdmin middleware
const { createEvent, getAllEvents, getEventById, updateEvent, deleteEvent } = require('../controllers/eventController');

// Event Routes
router.post('/', protect, isAdmin, createEvent);
router.get('/', getAllEvents);
router.get('/:id', getEventById);
router.put('/:id', protect, isAdmin, updateEvent);
router.delete('/:id', protect, isAdmin, deleteEvent);

module.exports = router;
