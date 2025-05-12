const jwt = require('jsonwebtoken');

// Middleware to protect routes
// This middleware checks if the request has a valid JWT token
function protect(req, res, next) {
  let token = req.header('Authorization');

  if (!token) {
    return res.status(401).json({ error: 'No token, authorization denied' });
  }

  // Remove 'Bearer ' from the token
  token = token.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach user info (id, email, role)
    next(); // Continue to the protected route
  } catch (error) {
    res.status(401).json({ error: 'Token is not valid' });
  }
}

// Middleware to check if the user is an admin
const isAdmin = (req, res, next) => {
  if (req.user && req.user.role === 'admin') {
    next();
  } else {
    res.status(403).json({ message: 'Admin access only' });
  }
};

// Export the middleware functions
module.exports = { protect, isAdmin };
