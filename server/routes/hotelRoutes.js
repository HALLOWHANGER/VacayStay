/**
 * hotelRoutes.js - Hotel Management API Routes
 * 
 * This file defines all endpoints for managing hotels:
 * - Hotel registration and listing
 * - Hotel approval workflow for new registrations
 * - Admin hotel management
 * - Payment processing for new hotels
 * - Room availability toggle
 */

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";

import { 
  registerHotel,              // Create a new hotel
  getAllHotels,               // Get all approved hotels
  getAllAdminHotels,          // Admin: Get all hotels
  getPending,                 // Get pending hotel registrations
  getAllPending,              // Get all pending hotels
  getPendingHotels,           // Get pending hotels for current owner
  getAllPendingPayments,      // Get pending payments
  approvePending,             // Admin: Approve a pending hotel
  declinePending,             // Admin: Decline a pending hotel
  toggleRoomAvailability      // Toggle room availability
} from "../controllers/hotelController.js";

const hotelRouter = express.Router();

/**
 * ========== PUBLIC ROUTES ==========
 */

/**
 * Get all approved hotels
 * GET /api/hotels/
 */
hotelRouter.get("/", getAllHotels);

/**
 * Get pending hotel registrations (for approval)
 * GET /api/hotels/pending
 */
hotelRouter.get("/pending", getPending);

/**
 * Get all pending hotels (admin view)
 * GET /api/hotels/pending_hotels
 */
hotelRouter.get("/pending_hotels", getAllPending);

/**
 * Get all pending payments
 * GET /api/hotels/payment
 */
hotelRouter.get("/payment", getAllPendingPayments);

/**
 * ========== PROTECTED ROUTES (Authenticated Users) ==========
 */

/**
 * Register a new hotel
 * POST /api/hotels/
 * Body: Form data with hotel info and images (max 5)
 * Requires: Authenticated user (hotel owner)
 */
hotelRouter.post("/", upload.array("images", 5), protect, registerHotel);

/**
 * Get pending hotels for current owner
 * GET /api/hotels/owner
 * Requires: Hotel owner role
 */
hotelRouter.get("/owner", protect, getPendingHotels);

/**
 * Toggle room availability for a hotel
 * POST /api/hotels/toggle-availability
 * Requires: Hotel owner
 */
hotelRouter.post("/toggle-availability", protect, toggleRoomAvailability);

/**
 * ========== ADMIN ROUTES ==========
 */

/**
 * Get all hotels (admin view)
 * GET /api/hotels/admin
 */
hotelRouter.get("/admin", getAllAdminHotels);

/**
 * Approve a pending hotel registration
 * POST /api/hotels/pending/approve/:id
 * Requires: Admin role
 */
hotelRouter.post("/pending/approve/:id", approvePending);

/**
 * Decline a pending hotel registration
 * DELETE /api/hotels/pending/decline/:id
 * Requires: Admin role
 */
hotelRouter.delete("/pending/decline/:id", declinePending);

export default hotelRouter;
