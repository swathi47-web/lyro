// ✅ FILE: server/controllers/adoptionRequestController.js (Final fix to SOLD status)
import AdoptionRequest from '../models/AdoptionRequest.js';
import Pet from '../models/Pet.js';

// Create new adoption request
export const createAdoptionRequest = async (req, res) => {
  try {
    const { petId, message } = req.body;
    const userId = req.user._id;

    const existing = await AdoptionRequest.findOne({ userId, petId });
    if (existing) {
      return res.status(400).json({ error: "You have already requested this pet." });
    }

    const existingPet = await Pet.findById(petId);
    if (!existingPet || existingPet.isAdopted) {
      return res.status(400).json({ error: "This pet is already adopted." });
    }

    const newRequest = new AdoptionRequest({
      userId,
      petId,
      message,
      status: "Pending",
    });

    await newRequest.save();
    res.status(201).json(newRequest);
  } catch (err) {
    console.error("Adoption request error:", err);
    res.status(500).json({ error: "Failed to submit request" });
  }
};

// Get all requests (admin)
export const getAllAdoptionRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find()
      .populate("userId", "_id name email")
      .populate("petId", "_id breed type isAdopted");
    res.json(requests);
  } catch (err) {
    console.error("Failed to fetch requests", err);
    res.status(500).json({ error: "Server error" });
  }
};

// ✅ Update request status and ensure pet's isAdopted is saved
export const updateRequestStatus = async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);
    if (!request) {
      return res.status(404).json({ error: "Request not found" });
    }
    request.status = req.body.status;
    await request.save();

    // ✅ Force saving pet status
    const pet = await Pet.findById(request.petId);
    if (req.body.status === "Approved") {
      pet.isAdopted = true;
    } else if (req.body.status === "Pending" || req.body.status === "Rejected") {
      pet.isAdopted = false;
    }
    await pet.save();

    res.status(200).json({ message: "Status updated", request });
  } catch (err) {
    console.error("Failed to update request status:", err);
    res.status(500).json({ error: "Failed to update request status" });
  }
};

// Delete request (user)
export const deleteRequest = async (req, res) => {
  try {
    const request = await AdoptionRequest.findById(req.params.id);
    if (!request) return res.status(404).json({ error: "Request not found" });

    if (request.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Not authorized to delete this request" });
    }

    await request.deleteOne();
    res.json({ message: "Request cancelled successfully" });
  } catch (err) {
    console.error("Delete request error:", err);
    res.status(500).json({ error: "Failed to cancel request" });
  }
};

// Get user requests
export const getUserRequests = async (req, res) => {
  try {
    const requests = await AdoptionRequest.find({ userId: req.user._id })
      .populate("petId", "_id breed type image isAdopted");
    res.json(requests);
  } catch (err) {
    console.error("Failed to load user requests", err);
    res.status(500).json({ error: "Server error" });
  }
};


