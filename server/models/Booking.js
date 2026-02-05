import mongoose from "mongoose";
const { Schema } = mongoose;

const bookingSchema = new Schema(
  {
    user: { type: String, ref: "User", required: true },
    room: { type: String, ref: "Room", required: true },
    hotel: { type: String, ref: "Hotel", required: true },

    checkInDate: { type: Date, required: true },
    checkOutDate: { type: Date, required: true },

    totalPrice: { type: Number, required: true },
    guests: { type: Number, required: true },

    status: {
      type: String,
      enum: ["pending", "confirmed", "cancelled", "refunded"],
      default: "pending",
    },

    paymentMethod: { type: String, default: "Pay At Hotel" },

    paymentStatus: {
      type: String,
      enum: ["awaiting", "paid", "failed", "cancelled"],
      default: "awaiting",
    },

    refundStatus: {
      type: String,
      enum: ["none", "requested", "refunded", "declined"],
      default: "none",
    },

    rescheduleRequest: {
      requested: { type: Boolean, default: false },
      newCheckInDate: Date,
      newCheckOutDate: Date,
      status: {
        type: String,
        enum: ["pending", "approved", "rejected"],
      },
      requestedAt: Date,
      reviewedAt: Date,
    },
  },
  { timestamps: true }
);


const Booking = mongoose.model("Booking", bookingSchema);

export default Booking;
