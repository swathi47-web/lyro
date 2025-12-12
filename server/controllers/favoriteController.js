// ✅ FILE: server/controllers/favoriteController.js (Final working version)
import Favorite from "../models/Favorite.js";

// ✅ Add to favorites
export const addFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const petId = req.params.petId;

    const existing = await Favorite.findOne({ userId, petId });
    if (existing) return res.status(400).json({ error: "Already in favorites" });

    const newFav = new Favorite({ userId, petId });
    await newFav.save();
    res.status(201).json(newFav);
  } catch (err) {
    console.error("Favorite add error:", err);
    res.status(500).json({ error: "Failed to add favorite" });
  }
};

// ✅ Remove favorite by userId + petId
export const removeFavorite = async (req, res) => {
  try {
    const userId = req.user._id;
    const petId = req.params.petId;

    const deleted = await Favorite.findOneAndDelete({ userId, petId });
    if (!deleted) return res.status(404).json({ error: "Favorite not found" });

    res.json({ message: "Favorite removed" });
  } catch (err) {
    console.error("Favorite remove error:", err);
    res.status(500).json({ error: "Failed to remove favorite" });
  }
};

// ✅ Get all favorites of user
export const getFavorites = async (req, res) => {
  try {
    const userId = req.user._id;
    const favorites = await Favorite.find({ userId });
    res.json(favorites);
  } catch (err) {
    console.error("Favorite fetch error:", err);
    res.status(500).json({ error: "Failed to load favorites" });
  }
};











