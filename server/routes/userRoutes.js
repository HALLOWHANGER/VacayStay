/**
 * userRoutes.js - User Management API Routes
 * 
 * This file defines endpoints for user-related operations:
 * - Retrieving user profile data
 * - Storing user search history
 * - Finding users (admin function)
 * - Updating user roles (admin function)
 */

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { 
  getUserData,                // Get logged-in user's data
  storeRecentSearchedCities,  // Store user's recent city searches
  getUsers,                   // Admin: Get all users
  updateUserRole              // Admin: Update user role
} from "../controllers/userController.js";

const userRouter = express.Router();

/**
 * ========== PROTECTED ROUTES (Authenticated Users) ==========
 */

/**
 * Get current logged-in user's data
 * GET /api/user/
 * Returns: User profile, recent searches, role info
 * Requires: Authenticated user
 */
userRouter.get("/", protect, getUserData);

/**
 * Store recent city searches for user
 * POST /api/user/store-recent-search
 * Body: { city }
 * Requires: Authenticated user
 */
userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);

/**
 * Update user role (for promoting users to hotel owner)
 * POST /api/user/update-role
 * Body: { userId, role }
 * Requires: Authenticated user
 */
userRouter.post("/update-role", protect, updateUserRole);

/**
 * ========== ADMIN ROUTES ==========
 */

/**
 * Get all users (admin function)
 * GET /api/user/find-users
 * Returns: List of all users in system
 */
userRouter.get("/find-users", getUsers);

export default userRouter;