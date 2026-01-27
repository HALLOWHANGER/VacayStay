/**
 * server.js - Express Server Configuration
 * 
 * This is the main entry point for the VacayStay backend API.
 * It sets up:
 * - Express app and middleware (CORS, JSON parsing, authentication)
 * - Database connections (MongoDB)
 * - Third-party services (Cloudinary, Stripe, Clerk)
 * - API routes for all features (hotels, rooms, bookings, users, etc.)
 * - Webhook handlers (Clerk, Stripe)
 */

import express from "express";
import "dotenv/config";
import cors from "cors";
import connectDB from "./configs/db.js";
import { clerkMiddleware } from "@clerk/express";
import userRouter from "./routes/userRoutes.js";
import hotelRouter from "./routes/hotelRoutes.js";
import newsletterRouter from "./routes/newsletterRoutes.js";
import roomRouter from "./routes/roomRoutes.js";
import contactRoutes from "./routes/contactRoutes.js";
import bookingRouter from "./routes/bookingRoutes.js";
import citiesRouter from "./routes/citiesRoutes.js";
import clerkWebhooks from "./controllers/clerkWebhooks.js";
import connectCloudinary from "./configs/cloudinary.js";
import { stripeWebhooks } from "./controllers/stripeWebhooks.js";

/**
 * Initialize database and third-party services
 */
connectDB();
connectCloudinary();

/**
 * Create Express application instance
 */
const app = express();

/**
 * Middleware Configuration
 */
app.use(cors());

/**
 * Stripe webhook handler - must be before express.json() for raw body
 * Handles payment confirmation and status updates
 */
app.post("/api/stripe",express.raw({ type: "application/json" }),stripeWebhooks);

/**
 * Body parser middleware - parse JSON request bodies
 */
app.use(express.json());

/**
 * Authentication middleware - attach user info to requests
 */
app.use(clerkMiddleware());

/**
 * ========== API ROUTE CONFIGURATION ==========
 */

/**
 * Clerk webhook for user authentication events
 * Syncs Clerk authentication with database
 */
app.use("/api/clerk", clerkWebhooks);

/**
 * Health check endpoint
 */
app.get("/", (req, res) => res.send("API is working"));

/**
 * User routes - authentication, profile management
 */
app.use("/api/user", userRouter);

/**
 * Hotel management routes - list, create, update hotels
 */
app.use("/api/hotels", hotelRouter);

/**
 * Newsletter routes - email subscription management
 */
app.use("/api/newsletter", newsletterRouter);

/**
 * Contact form routes - user inquiries
 */
app.use("/api/contact", contactRoutes);

/**
 * Room management routes - list, create, update rooms
 */
app.use("/api/rooms", roomRouter);

/**
 * Booking management routes - reservations, payments, cancellations
 */
app.use("/api/bookings", bookingRouter);

/**
 * City management routes - destination information
 */
app.use("/api/cities", citiesRouter);

/**
 * Start the server
 */
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
