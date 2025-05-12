const express = require('express');
const User = require('../models/User');
const router = express.Router();
const jwt = require('jsonwebtoken');  // We'll use this later for token-based authentication

// User Registration Route
router.post('/register', async (req, res) => {
  const { firstName, lastName, email, password, role } = req.body;

  try {
    // Check if the user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    // Create a new user
    const newUser = new User({
      firstName,
      lastName,
      email,
      password,
      role: role || 'user',  // Default to 'user' if no role is provided
    });

    // Save the user
    await newUser.save();

    // Respond with the new user's data (excluding password)
    res.status(201).json({
      message: 'User registered successfully',
      user: {
        firstName: newUser.firstName,
        lastName: newUser.lastName,
        email: newUser.email,
        role: newUser.role,  // Include user role in the response
      },
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

// User Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Compare the entered password with the stored hashed password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid email or password' });
    }

    // Generate JWT Token (for future protected routes)
    const token = jwt.sign(
      { id: user._id, email: user.email, role: user.role },  // Include user role in the token
      // This is a secret key used to sign the JWT token. In a real application, you should store this in an environment variable.
      process.env.JWT_SECRET,  // Secret key from .env file
      { expiresIn: process.env.JWT_EXPIRES_IN }  // Token expiration
    );

    // Send the response with the JWT token
    res.status(200).json({
      message: 'Login successful',
      token,
      expiresIn: process.env.JWT_EXPIRES_IN,  // Token expiration time
    });
  } catch (error) {
    res.status(500).json({ error: 'Server error', details: error.message });
  }
});

module.exports = router;
