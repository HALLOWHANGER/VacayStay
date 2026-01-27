/**
 * bookingRoutes.js - Booking API Routes
 * 
 * This file defines all API endpoints related to bookings:
 * - Creating and managing reservations
 * - Checking room availability
 * - Processing payments
 * - Handling cancellations and refunds
 * - Getting booking information for users, owners, and admins
 */

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  checkAvailabilityAPI,        // Check if room is available
  createBooking,               // Create a new booking
  getRoomBookings,             // Get all bookings for a specific room
  getOwnerBookings,            // Get bookings for hotel owner's hotels
  getAllBookings,              // Admin: Get all bookings
  releaseBookingRoom,          // Cancel a booking
  refundBooking,               // Process refund
  getHotelBookings,            // Get bookings for a specific hotel
  getUserBookings,             // Get current user's bookings
  getHotelBookingsAll,         // Get all bookings for admin
  generateOrders,              // Generate order records
  stripePayment                // Process Stripe payment
} from '../controllers/bookingController.js';

const bookingRouter = express.Router();

/**
 * ========== PUBLIC ROUTES ==========
 */

/**
 * Check room availability
 * POST /api/bookings/check-availability
 * Body: { roomType, checkIn, checkOut, guests }
 */
bookingRouter.post('/check-availability', checkAvailabilityAPI);

/**
 * Get bookings for a specific room
 * GET /api/bookings/room/:roomId
 */
bookingRouter.get("/room/:roomId", getRoomBookings);

/**
 * Get all hotel bookings (admin view)
 * GET /api/bookings/hotelAdmin
 */
bookingRouter.get('/hotelAdmin', getHotelBookingsAll);

/**
 * Generate order records
 * GET /api/bookings/orders
 */
bookingRouter.get('/orders', generateOrders);

/**
 * ========== PROTECTED ROUTES (Authenticated Users) ==========
 */

/**
 * Get all bookings (admin only)
 * GET /api/bookings/
 * Requires: Admin role
 */
bookingRouter.get("/", protect, getAllBookings);

/**
 * Get bookings for logged-in owner's hotels
 * GET /api/bookings/owner
 * Requires: Hotel owner role
 */
bookingRouter.get("/owner", protect, getOwnerBookings);

/**
 * Create a new booking
 * POST /api/bookings/book
 * Body: { room, checkInDate, checkOutDate, guests, paymentMethod }
 * Requires: Authenticated user
 */
bookingRouter.post('/book', protect, createBooking);

/**
 * Get current user's bookings
 * GET /api/bookings/user
 * Requires: Authenticated user
 */
bookingRouter.get('/user', protect, getUserBookings);

/**
 * Get bookings for a specific hotel
 * GET /api/bookings/hotel
 * Requires: Hotel owner (must own the hotel)
 */
bookingRouter.get('/hotel', protect, getHotelBookings);

/**
 * Cancel/Release a booking
 * PUT /api/bookings/:id/release
 * Requires: Authenticated user (booking owner)
 */
bookingRouter.put("/:id/release", protect, releaseBookingRoom);

/**
 * Process refund for a booking
 * PUT /api/bookings/:id/refund
 * Requires: Authenticated user
 */
bookingRouter.put("/:id/refund", protect, refundBooking);

/**
 * Process Stripe payment
 * POST /api/bookings/stripe-payment
 * Body: { bookingId }
 * Requires: Authenticated user
 */
bookingRouter.post('/stripe-payment', protect, stripePayment);

export default bookingRouter;