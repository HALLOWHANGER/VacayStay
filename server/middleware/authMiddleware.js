/**
 * authMiddleware.js - Authentication Middleware
 * 
 * This middleware verifies that the request comes from an authenticated user.
 * It checks the Clerk authentication token and loads the user from the database.
 * 
 * Usage: Apply to protected routes that require authentication
 */

import User from "../models/User.js";

/**
 * Protect Middleware
 * Validates user authentication and attaches user data to request
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.auth - Clerk authentication info
 * @param {string} req.auth.userId - Clerk user ID from auth token
 * @param {Object} res - Express response object
 * @param {Function} next - Express next middleware function
 * 
 * Flow:
 * 1. Extract userId from Clerk auth token
 * 2. Return error if not authenticated
 * 3. Find user in database by ID
 * 4. Attach user to request object
 * 5. Continue to next middleware/handler
 */
export const protect = async (req, res, next) => {
  const { userId } = req.auth;
  
  // Check if user is authenticated via Clerk
  if (!userId) {
    res.json({ success: false, message: "not authenticated" });
  } else {
    // Find user in database
    const user = await User.findById(userId);
    
    // Attach user data to request for use in controllers
    req.user = user;
    
    // Continue to next middleware/route handler
    next();
  }
};