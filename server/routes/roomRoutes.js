/**
 * roomRoutes.js - Room Management API Routes
 * 
 * This file defines all endpoints for room operations:
 * - Creating and listing rooms
 * - Searching available rooms
 * - Admin and owner room management
 * - Room availability toggling
 */

import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import upload from "../middleware/uploadMiddleware.js";
import { 
  createRoom,                 // Create a new room
  getRooms,                   // Get all available rooms
  getAdminRooms,              // Admin: Get all rooms
  toggleRoomAvailability,     // Toggle room availability
  getOwnerRooms,              // Get rooms owned by current owner
  getOwnerRoomsDasB,          // Get owner's rooms for dashboard
  searchAvailableRooms        // Search for available rooms with filters
} from "../controllers/roomController.js";

const roomRouter = express.Router();

/**
 * ========== PUBLIC ROUTES ==========
 */

/**
 * Get all available rooms
 * GET /api/rooms/
 */
roomRouter.get("/", getRooms);

/**
 * Search for available rooms with filters
 * POST /api/rooms/search
 * Body: { roomType, checkIn, checkOut, guests }
 */
roomRouter.post("/search", searchAvailableRooms);

/**
 * ========== PROTECTED ROUTES (Authenticated Users) ==========
 */

/**
 * Create a new room
 * POST /api/rooms/
 * Body: Form data with room info and images (max 5)
 * Requires: Hotel owner role
 */
roomRouter.post("/", upload.array("images", 5), protect, createRoom);

/**
 * Get rooms owned by current owner
 * GET /api/rooms/owner
 * Requires: Hotel owner role
 */
roomRouter.get("/owner", protect, getOwnerRooms);

/**
 * Get rooms for owner's dashboard
 * GET /api/rooms/owner/dasb
 * Requires: Hotel owner role
 */
roomRouter.get("/owner/dasb", protect, getOwnerRoomsDasB);

/**
 * Toggle room availability
 * POST /api/rooms/toggle-availability
 * Requires: Hotel owner or admin
 */
roomRouter.post("/toggle-availability", protect, toggleRoomAvailability);

/**
 * ========== ADMIN ROUTES ==========
 */

/**
 * Get all rooms (admin view)
 * GET /api/rooms/admin
 */
roomRouter.get("/admin", getAdminRooms);

export default roomRouter;
