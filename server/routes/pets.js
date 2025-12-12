import express from "express";
import {
  getAllPets,
  getPetById,
  createPet,
  updatePet,
  deletePet,
} from "../controllers/petController.js";

import { protect, authorizeRoles } from "../middleware/authMiddleware.js";

const router = express.Router();

// 🌐 Public Routes
router.get("/", getAllPets);
router.get("/:id", getPetById);

// 🔐 Admin-only Routes
router.post("/", protect, authorizeRoles("admin"), createPet);
router.put("/:id", protect, authorizeRoles("admin"), updatePet);
router.delete("/:id", protect, authorizeRoles("admin"), deletePet);

export default router;
















