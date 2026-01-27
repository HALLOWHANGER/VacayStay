/**
 * Booking.js - Booking Database Model
 * 
 * This model represents a hotel room booking/reservation.
 * It tracks:
 * - User and room details
 * - Check-in/check-out dates
 * - Pricing and guest count
 * - Booking status (pending, confirmed, cancelled, refunded)
 * - Payment status and method
 * - Refund tracking
 */

import mongoose from "mongoose";
const { Schema } = mongoose;

/**
 * Booking Schema
 * Defines the structure and constraints of booking documents
 */
const bookingSchema = new Schema(
  {
    // References to related documents
    user: { type: String, ref: "User", required: true },        // Clerk user ID
    room: { type: String, ref: "Room", required: true },        // Room being booked
    hotel: { type: String, ref: "Hotel", required: true },      // Hotel containing the room

    // Reservation dates
    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },

    // Booking details
    totalPrice: { type: Number, required: true },               // Total cost of the booking
    guests: { type: Number, required: true },                   // Number of guests

    // Booking status
    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "refunded"],
      default: "pending",
    },

    // Payment details
    paymentMethod: {
      type: String,
      default: "Pay At Hotel",
    },

    paymentStatus: {
      type: String,
      enum: ["awaiting", "paid", "failed"],
      default: "awaiting",
    },

    // Refund tracking
    refundStatus: {
      type: String,
      enum: ["none", "requested", "refunded"],
      default: "none",
    },
  },
  { timestamps: true }  // Automatically track created and updated times
);

/**
 * Booking Model
 * Used to perform CRUD operations on bookings
 */
const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
