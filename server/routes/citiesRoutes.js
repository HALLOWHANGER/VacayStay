/**
 * citiesRoutes.js - City/Destination Management Routes
 * 
 * This file manages city and destination data:
 * - Listing available destinations
 * - Adding new cities (admin)
 * - Deleting cities (admin)
 */

import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { 
  getAllCities,   // Get all available cities
  addCity,        // Add a new city
  deleteCity      // Delete a city
} from '../controllers/citiesController.js';

const citiesRouter = express.Router();

/**
 * ========== PROTECTED ROUTES (Authenticated Users) ==========
 */

/**
 * Get all cities/destinations
 * GET /api/cities/
 * Requires: Authenticated user
 */
citiesRouter.get('/', protect, getAllCities);

/**
 * Add a new city (admin function)
 * POST /api/cities/
 * Body: { name, description, image, ... }
 * Requires: Admin role
 */
citiesRouter.post('/', protect, addCity);

/**
 * Delete a city (admin function)
 * DELETE /api/cities/:id
 * Requires: Admin role
 */
citiesRouter.delete('/:id', protect, deleteCity);

export default citiesRouter;