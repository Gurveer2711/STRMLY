import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

dotenv.config();
connectDB();

const app = express();

app.get("/", (req, res) => {
  res.send("API Running");
});

const PORT = process.env.PORT;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));