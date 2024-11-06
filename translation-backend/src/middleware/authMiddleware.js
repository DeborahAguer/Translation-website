// middleware/authMiddleware.js
const jwt = require('jsonwebtoken');
const config = require('../config/config');

// Middleware to verify JWT token
const authMiddleware = (req, res, next) => {
  const token = req.header('Authorization'); // The token is expected to be in the Authorization header

  if (!token) {
    return res.status(401).json({ message: 'Access denied. No token provided.' });
  }

  try {
    // Verify the token using the JWT_SECRET from the config
    const decoded = jwt.verify(token, config.JWT_SECRET);

    // Attach user info to request object for access in other routes
    req.user = decoded;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    res.status(400).json({ message: 'Invalid or expired token.' });
  }
};

module.exports = authMiddleware;
