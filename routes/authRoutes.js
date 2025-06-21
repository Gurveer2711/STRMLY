import express from "express";
import { signUp, login } from "../controllers/authController";

const router = express.router();

router.post('/signUp', signUp);
router.post('/login', login);
router.get("/profile", protect, getProfile);

export default router;