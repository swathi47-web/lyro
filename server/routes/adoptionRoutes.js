const express = require('express');
const router = express.Router();
const Adoption = require('../models/Adoption');

// ✅ GET adoption requests by user ID
router.get('/user/:userId', async (req, res) => {
  const { userId } = req.params;

  try {
    const adoptions = await Adoption.find({ user: userId }).populate('pet');
    res.json(adoptions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch adoption requests.' });
  }
});

module.exports = router;
