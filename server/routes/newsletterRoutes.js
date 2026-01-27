/**
 * newsletterRoutes.js - Newsletter Subscription Routes
 * 
 * This file manages email newsletter subscriptions.
 * Allows users to subscribe to the VacayStay newsletter
 * for travel tips, deals, and promotions.
 */

import express from "express";
import { Subscribe } from "../controllers/newsletterController.js";

const newsletterRouter = express.Router();

/**
 * Subscribe to newsletter
 * POST /api/newsletter/subscribe
 * Body: { email }
 * Public endpoint - no authentication required
 */
newsletterRouter.post("/subscribe", Subscribe);

export default newsletterRouter;