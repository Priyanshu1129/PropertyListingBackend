import express from "express";
import authMiddleware from "../middleware/auth.js";
import {
  createProperty,
  getPropertyById,
  getPropertyList,
  updateProperty,
  deleteProperty,
} from "../controllers/property.js";

const router = express.Router();

router.post("/", authMiddleware, createProperty);

router.get("/details/:id", authMiddleware, getPropertyById);

router.get("/list", authMiddleware, getPropertyList);

router.put("/:id", authMiddleware, updateProperty);

router.delete("/:id", authMiddleware, deleteProperty);

export default router;
