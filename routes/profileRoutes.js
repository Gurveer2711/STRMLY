import express from "express";
import { getProfile } from "../controllers/profileController";

const router = express.router();

router.get('/profile', getProfile);

export default router;
