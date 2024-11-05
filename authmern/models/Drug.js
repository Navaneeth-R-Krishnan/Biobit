// models/Drug.js
const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  date: { type: Date, required: true },
  status: {
    type: String,
    enum: ["pending", "approved", "rejected"],
    default: "pending"
  },
  rejectionComment: { type: String }
});

module.exports = mongoose.model('Drug', drugSchema);
