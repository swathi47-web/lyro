// server/controllers/petController.js
import Pet from "../models/Pet.js";

// ✅ Get all pets
export const getAllPets = async (req, res) => {
  try {
    const pets = await Pet.find();
    res.status(200).json(pets);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pets." });
  }
};

// ✅ Get a pet by ID
export const getPetById = async (req, res) => {
  try {
    const pet = await Pet.findById(req.params.id);
    if (!pet) return res.status(404).json({ error: "Pet not found" });
    res.status(200).json(pet);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch pet." });
  }
};

// ✅ Create a new pet
export const createPet = async (req, res) => {
  try {
    const newPet = new Pet(req.body);
    await newPet.save();
    res.status(201).json(newPet);
  } catch (err) {
    res.status(500).json({ error: "Failed to create pet." });
  }
};

// ✅ Update an existing pet
export const updatePet = async (req, res) => {
  try {
    const updatedPet = await Pet.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedPet) return res.status(404).json({ error: "Pet not found" });
    res.status(200).json(updatedPet);
  } catch (err) {
    res.status(500).json({ error: "Failed to update pet." });
  }
};

// ✅ Delete a pet
export const deletePet = async (req, res) => {
  try {
    const deletedPet = await Pet.findByIdAndDelete(req.params.id);
    if (!deletedPet) return res.status(404).json({ error: "Pet not found" });
    res.status(200).json({ message: "Pet deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete pet." });
  }
};





