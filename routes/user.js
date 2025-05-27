import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  findUserByEmail,
  getMyProfile,
  recommendProperty,
} from "../controllers/user.js";

const router = express.Router();

router.get("/my-profile", authMiddleware, getMyProfile);
router.get("/find-by-email", authMiddleware, findUserByEmail);
router.post("/:userId/recommend", authMiddleware, recommendProperty);

export default router;
