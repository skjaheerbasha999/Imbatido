const express = require('express');
const router = express.Router();
const Adherence = require('../models/Adherence');

// Get adherence records for a user
router.get('/user/:userId', async (req, res) => {
  try {
    const adherence = await Adherence.find({ userId: req.params.userId })
      .populate('medicineId')
      .sort({ date: -1 });
    res.json(adherence);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching adherence', error: error.message });
  }
});

// Get adherence by date range
router.get('/user/:userId/range', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {
      userId: req.params.userId,
      date: {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      },
    };
    const adherence = await Adherence.find(query).populate('medicineId');
    res.json(adherence);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching adherence', error: error.message });
  }
});

// Mark medicine as taken
router.post('/', async (req, res) => {
  try {
    const { userId, medicineId, scheduledTime, notes } = req.body;

    if (!userId || !medicineId || !scheduledTime) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const adherence = new Adherence({
      userId,
      medicineId,
      scheduledTime,
      takenTime: new Date(),
      taken: true,
      notes,
    });

    await adherence.save();
    res.status(201).json(adherence);
  } catch (error) {
    res.status(500).json({ message: 'Error recording adherence', error: error.message });
  }
});

// Update adherence record
router.put('/:id', async (req, res) => {
  try {
    const { taken, takenTime, notes } = req.body;
    const adherence = await Adherence.findByIdAndUpdate(
      req.params.id,
      { taken, takenTime, notes, updatedAt: Date.now() },
      { new: true }
    ).populate('medicineId');
    if (!adherence) {
      return res.status(404).json({ message: 'Adherence record not found' });
    }
    res.json(adherence);
  } catch (error) {
    res.status(500).json({ message: 'Error updating adherence', error: error.message });
  }
});

// Get adherence statistics
router.get('/stats/:userId', async (req, res) => {
  try {
    const { startDate, endDate } = req.query;
    const query = {
      userId: req.params.userId,
      date: {
        $gte: new Date(startDate || new Date(Date.now() - 30 * 24 * 60 * 60 * 1000)),
        $lte: new Date(endDate || Date.now()),
      },
    };

    const records = await Adherence.find(query);
    const total = records.length;
    const taken = records.filter(r => r.taken).length;
    const adherenceRate = total > 0 ? Math.round((taken / total) * 100) : 0;

    res.json({
      totalScheduled: total,
      totalTaken: taken,
      adherenceRate,
      percentage: adherenceRate,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching statistics', error: error.message });
  }
});

module.exports = router;
