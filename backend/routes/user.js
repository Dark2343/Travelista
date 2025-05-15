const express = require('express');
const { registerUser, loginUser, deleteUser } = require('../controllers/userController');
const { protect, isAdmin } = require('../middlewares/protect');
const router = express.Router();

// User Routes
router.post('/register', registerUser);
router.post('/login', loginUser);
router.delete('/:id', protect, isAdmin, deleteUser); // Admin only

module.exports = router;
