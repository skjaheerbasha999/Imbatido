const express = require('express');
const router = express.Router();
const Medicine = require('../models/Medicine');

// Get all medicines for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const medicines = await Medicine.find({ userId: req.params.userId });
    res.json(medicines);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medicines', error: error.message });
  }
});

// Get medicine by ID
router.get('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching medicine', error: error.message });
  }
});

// Create new medicine
router.post('/', async (req, res) => {
  try {
    const { userId, name, dose, frequency, times, instructions } = req.body;

    // Validate required fields
    if (!userId || !name || !dose || !times) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const medicine = new Medicine({
      userId,
      name,
      dose,
      frequency: frequency || 'once daily',
      times,
      instructions,
    });

    await medicine.save();
    res.status(201).json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Error creating medicine', error: error.message });
  }
});

// Update medicine
router.put('/:id', async (req, res) => {
  try {
    const { name, dose, frequency, times, instructions, endDate } = req.body;
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      { name, dose, frequency, times, instructions, endDate, updatedAt: Date.now() },
      { new: true }
    );
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error) {
    res.status(500).json({ message: 'Error updating medicine', error: error.message });
  }
});

// Delete medicine
router.delete('/:id', async (req, res) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting medicine', error: error.message });
  }
});

module.exports = router;
