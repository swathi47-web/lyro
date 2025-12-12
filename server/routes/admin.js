// ✅ FILE: server/routes/admin.js (Final clean version — synced with controller names)
import express from 'express';
import {
  getAllAdoptionRequests,
  updateRequestStatus,
} from '../controllers/adoptionRequestController.js';
import {
  createPet,
  updatePet,
  deletePet,
} from '../controllers/petController.js';
import { protect, isAdmin } from '../middleware/authMiddleware.js';

const router = express.Router();

// 🔐 View all adoption requests (admin only)
router.get('/requests', protect, isAdmin, getAllAdoptionRequests);

// ✅ Update adoption request status (Approved, Rejected, Pending)
router.put('/requests/:id/status', protect, isAdmin, updateRequestStatus);

// 🐾 Add a new pet (admin only)
router.post('/pets', protect, isAdmin, createPet);

// ✏️ Update a pet
router.put('/pets/:id', protect, isAdmin, updatePet);

// ❌ Delete a pet
router.delete('/pets/:id', protect, isAdmin, deletePet);

export default router;






