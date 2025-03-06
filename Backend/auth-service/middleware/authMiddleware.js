// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import axios from 'axios';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Middleware to verify token by calling Auth Service
export const authenticate = async (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Authentication required' });
  }

  try {
    // Verify token locally or call Auth Service
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded; // Attach user info to request
    next();
  } catch (error) {
    // Alternatively, call Auth Service to verify
    try {
      const response = await axios.get('http://localhost:5000/api/auth/verify', {
        headers: { Authorization: `Bearer ${token}` },
      });
      req.user = response.data.user;
      next();
    } catch (err) {
      res.status(401).json({ message: 'Invalid or expired token', error: err.message });
    }
  }
};