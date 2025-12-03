import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import { getUserData, storeRecentSearchedCities, getUsers, updateUserRole } from "../controllers/userController.js";

const userRouter = express.Router();

userRouter.get("/", protect, getUserData);
userRouter.post("/store-recent-search", protect, storeRecentSearchedCities);
userRouter.get("/find-users", getUsers);
userRouter.post("/update-role", protect, updateUserRole);

export default userRouter;
