import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { checkAvailabilityAPI, approveReschedule, declineBooking, createBooking, RequestRefund, requestReschedule, getRoomBookings, getOwnerBookings, getAllBookings, releaseBookingRoom, refundBooking, getHotelBookings, getUserBookings, getHotelBookingsAll, generateOrders, stripePayment } from '../controllers/bookingController.js';

const bookingRouter = express.Router();

bookingRouter.get("/", protect, getAllBookings);
bookingRouter.get("/owner", protect, getOwnerBookings);
bookingRouter.put("/:id/release", protect, releaseBookingRoom);
bookingRouter.put("/:id/refund", protect, refundBooking);
bookingRouter.put("/:id/decline", protect, declineBooking);
bookingRouter.put("/ApproveReschedule", protect, approveReschedule);
bookingRouter.put("/:id/request_refund", protect, RequestRefund);

bookingRouter.post('/check-availability', checkAvailabilityAPI);
bookingRouter.post('/book', protect, createBooking);
bookingRouter.get('/user', protect, getUserBookings);
bookingRouter.get('/orders', generateOrders);
bookingRouter.post('/reschedule', protect, requestReschedule);
bookingRouter.get("/room/:roomId", getRoomBookings);
bookingRouter.get('/hotel', protect, getHotelBookings);
bookingRouter.get('/hotelAdmin', getHotelBookingsAll);
bookingRouter.post('/stripe-payment', protect, stripePayment);

export default bookingRouter;