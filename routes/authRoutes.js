import express from "express";
import { getProfile, signUp, login } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

router.post("/signup", signUp);
router.post("/login", login);
router.get("/profile", protect, getProfile);

export default router;
