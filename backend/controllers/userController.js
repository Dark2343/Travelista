// controllers/userController.js
const User = require('../models/user');
const Booking = require('../models/booking');
const jwt = require('jsonwebtoken');

// Register user
exports.registerUser = async (req, res) => {
  try {
    const { firstName, lastName, email, password, role } = req.body;
    
    // Check if user exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Create a new user
    const user = new User({
      firstName,
      lastName,
      email,
      password,
      role: role || 'user',  // Default to 'user' if no role is provided
    });
    await user.save();

    // Generate JWT
    const token = jwt.sign(
        { id: user._id, email: user.email, role: user.role },  // Include user role in the token
        process.env.JWT_SECRET,  // Secret key from .env file
        { expiresIn: process.env.JWT_EXPIRES_IN }  // Token expiration
    );
    res.status(201).json({
        message: 'User registered successfully',
        user: {
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
          role: user.role,  // Include user role in the response
        },
        token
     });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Login user
exports.loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role }, 
      process.env.JWT_SECRET,  // Secret key from .env file
      { expiresIn: process.env.JWT_EXPIRES_IN }  // Token expiration
    );
    
    // Send the response with the JWT token
    res.status(200).json({
      message: 'Login successful',
      token,
      expiresIn: process.env.JWT_EXPIRES_IN,  // Token expiration time
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Delete user
exports.deleteUser = async (req, res) => {
  try {
    const userId = req.params.id;

    // Delete the user
    const user = await User.findByIdAndDelete(userId);
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Delete associated bookings
    await Booking.deleteMany({ user: userId });

    res.status(200).json({ message: 'User and associated bookings deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};