// models/user.js
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs'); // This will be used for password hashing

// Define the schema for the Event
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,  // Required field
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  lastName: {
    type: String, // Assuming image is stored as a URL or file path
    required: true,
    minlength: 2,
    maxlength: 50,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
    trim: true,
    lowercase: true,
    validate: { // Custom validator for email format
      validator: function(v) {
        // Regular expression for basic email validation
        return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(v);
      },
      // Error message for invalid email
      message: props => `${props.value} is not a valid email!`
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    trim: true,
  },
  role: { 
    type: String, 
    enum: ["user", "admin"], 
    default: "user" 
  }, // 👈 Add this
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Hash the password before saving it to the database
userSchema.pre('save', async function(next) {
  // Check if password is modified (if it's not modified, no need to hash)
  if (!this.isModified('password')) return next();

  try {
    // Hash password with 10 salt rounds
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// Create a method to compare the entered password with the hashed password
userSchema.methods.matchPassword = async function(enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model
const User = mongoose.model('User', userSchema);

module.exports = User;