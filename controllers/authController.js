import asyncHandler from "express-async-handler";
import jwt from "jsonwebtoken";
import User from "../models/user";
import bcrypt from "bcrypt";

export const signUp = asyncHandler(async (req, res) => {
  const token = req.cookies.token;
  if (token) {
    return res
      .status(200)
      .json({ message: "User is already logged in.Please logout first" });
  }
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    res.status(400);
    throw new Error("Please add all fields");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User already exists");
  }

  const user = new User({
    name,
    email,
    password,
  });
  const saveUser = await user.save();

  if (saveUser) {
    return res.status(200).json({
      message: "Registration successful",
    });
  } else {
    res.status(400);
    throw new Error("Registration failed");
  }
});

export const login = asyncHandler(async (req, res) => {
  let token = req.cookies.token;
  if (token) {
    return res
      .status(200)
      .json({ message: "User is already logged in.Please logout first." });
  }

  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(401).json({ error: "Email and password are required" });
  }

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json({ error: "Invalid email or password" });
  }

  token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    {
      expiresIn: "30d",
    }
  );

  res.cookie("token", token, {
    httpOnly: true, 
    secure: process.env.NODE_ENV === "production", 
    sameSite: "Strict", 
    maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
  });

  return res.status(200).json({
    message: "Login successful!",
    user: { id: user._id, name: user.name, email: user.email },
  });
});
