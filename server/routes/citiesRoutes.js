import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { getAllCities, addCity, deleteCity } from '../controllers/citiesController.js';

const citiesRouter = express.Router();

citiesRouter.get('/', protect, getAllCities);

citiesRouter.post('/', protect, addCity);

citiesRouter.delete('/:id', protect, deleteCity);

export default citiesRouter;