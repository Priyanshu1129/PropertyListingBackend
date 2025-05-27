import express from "express";
const router = express.Router();

import { registration, login } from "../controllers/auth.js";

router.post("/register", registration);

router.post("/login", login);

export default router;
