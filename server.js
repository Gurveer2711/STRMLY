import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import cors from "cors";
import authRoutes from "./routes/authRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

dotenv.config();
const app = express();

app.use(cors());
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
app.use("/api/videos", videoRoutes);


const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));