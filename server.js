import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";
import connectDB from "./config/db.js";
dotenv.config();
const app = express();

app.use(
  cors({
    origin: "http://localhost:5173", 
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  })
);

app.use(helmet());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

const limiter = rateLimit({
  windowMs: 2 * 1000, //2 seconds
  max: 20,
  message: { error: "Too many requests, please try again later." },
  headers: true,
});
app.use(limiter);

//routes
app.use("/api/auth", authRoutes);
app.use("/api/video", videoRoutes);


connectDB();
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
