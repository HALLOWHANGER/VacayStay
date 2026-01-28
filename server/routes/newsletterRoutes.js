import express from "express";
import { Subscribe } from "../controllers/newsletterController.js";


const newsletterRouter = express.Router();

newsletterRouter.post("/subscribe", Subscribe);


export default newsletterRouter;