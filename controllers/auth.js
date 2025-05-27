import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import { catchAsyncError } from "../utils/catchAsyncError.js";

export const registration = catchAsyncError(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    const error = new Error("All fields are required.");
    error.statusCode = 400;
    return next(error);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    const error = new Error("Email already in use.");
    error.statusCode = 400;
    return next(error);
  }

  const newUser = new User({ name, email, password });
  await newUser.save();

  res.status(201).json({
    message: "User registered successfully.",
    user: { id: newUser._id, name: newUser.name, email: newUser.email },
  });
});

export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    const error = new Error("All fields are required.");
    error.statusCode = 400;
    return next(error);
  }

  const user = await User.findOne({ email });
  if (!user) {
    const error = new Error("Invalid credentials.");
    error.statusCode = 400;
    return next(error);
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    const error = new Error("Invalid credentials.");
    error.statusCode = 400;
    return next(error);
  }

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.json({
    message: "Login successful.",
    token,
    user: { id: user._id, name: user.name, email: user.email },
  });
});
