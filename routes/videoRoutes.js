import express from "express";
import { getVideo, recommendedVideos, uploadVideo } from "../controllers/videoController";
import { upload } from "../config/cloudinary.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.router();

router.post("/upload", protect, upload.single("video"),uploadVideo);
router.get("/", getVideo);
router.get('/recommended', recommendedVideos);

export default router;