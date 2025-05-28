import dotenv from "dotenv";
dotenv.config();
import express from "express";
import { connectDB } from "../config/db.js";
import authRouter from "../routes/auth.js";
import propertyRouter from "../routes/property.js";
import userRouter from "../routes/user.js";
import errorHandler from "../middleware/errorHandler.js";
import serverless from "serverless-http";

const app = express();
app.use(express.json());

connectDB();

app.get("/", (req, res) => {
  res.send("API is working");
});

app.use("/api/auth", authRouter);
app.use("/api/user", userRouter);
app.use("/api/property", propertyRouter);

app.use(errorHandler);

export const handler = serverless(app);
