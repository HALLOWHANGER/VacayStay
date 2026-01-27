import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { checkAvailabilityAPI, createBooking, getRoomBookings, getOwnerBookings, getAllBookings, releaseBookingRoom, refundBooking, getHotelBookings, getUserBookings, getHotelBookingsAll, generateOrders, stripePayment } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.get("/", protect, getAllBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.put("/:id/release", protect, releaseBookingRoom);
bookingRouter.put("/:id/refund", protect, refundBooking);

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/orders', generateOrders);
bookingRouter.get("/room/:roomId", getRoomBookings);
bookingRouter.get('/hotel', protect, getHotelBookings);
bookingRouter.get('/hotelAdmin', getHotelBookingsAll);
bookingRouter.post('/stripe-payment', protect, stripePayment);

export default bookingRouter;