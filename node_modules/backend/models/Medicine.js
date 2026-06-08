const mongoose = require('mongoose');

const medicineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  dose: {
    type: String,
    required: true,
  },
  frequency: {
    type: String,
    enum: ['once daily', 'twice daily', 'three times daily', 'as needed'],
    default: 'once daily',
  },
  times: [{
    type: String,
    required: true,
  }],
  instructions: String,
  startDate: {
    type: Date,
    default: Date.now,
  },
  endDate: Date,
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Medicine', medicineSchema);
