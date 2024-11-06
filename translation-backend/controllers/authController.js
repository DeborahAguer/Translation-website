// controllers/authController.js
const User = require('/models/User'); // Importing User model
const jwt = require('jsonwebtoken'); // To create and verify JWT tokens
const bcrypt = require('bcrypt'); // For password hashing and comparison
const config = require('../config/config'); // Configurations for JWT secret

// Register a new user
exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'User already exists.' });
    }

    // Create a new user and save to database
    const newUser = new User({ username, email, password });
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully.' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during registration.' });
  }
};

// Log in a user and generate a JWT token
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    // Validate password
    const isPasswordValid = await user.isPasswordValid(password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Invalid password.' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user._id, username: user.username },
      config.JWT_SECRET, // Secret from config file
      { expiresIn: '1h' } // Token expiration time
    );

    res.json({ message: 'Login successful', token });
  } catch (error) {
    res.status(500).json({ message: 'Server error during login.' });
  }
};

// Get user profile for the logged-in user
exports.getUser = async (req, res) => {
  try {
    // Retrieve user information using the userId from JWT token
    const user = await User.findById(req.user.userId).select('-password'); // Exclude password from response

    if (!user) {
      return res.status(404).json({ message: 'User not found.' });
    }

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: 'Server error retrieving user.' });
  }
};
