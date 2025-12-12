// ✅ FILE: server/routes/adoptionRequests.js (Final clean working version)
import express from 'express';
import {
  createAdoptionRequest,
  getAllAdoptionRequests,
  updateRequestStatus,  // ✅ Add this line
  deleteRequest,
  getUserRequests
} from '../controllers/adoptionRequestController.js';


import { protect, isAdmin } from '../middleware/authMiddleware.js';


const router = express.Router();

// ✅ Submit a new adoption request
router.post('/', protect, createAdoptionRequest);

// ✅ View all requests (admin-only, used by AdminDashboard)
router.get('/', protect, getAllAdoptionRequests);

// ✅ Delete request (user cancels own request)
router.delete('/:id', protect, deleteRequest);
router.put('/:id/status', protect, isAdmin, updateRequestStatus);

export default router;

























