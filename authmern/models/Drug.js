// models/Drug.js
const mongoose = require('mongoose');

const drugSchema = new mongoose.Schema({
  manufacturerId: { type: String, required: true },
  drugName: { type: String, required: true },
  qrCodeData: { type: String, required: true },  // base64-encoded QR data
  productionDate: { type: Date, required: true },
  expirationDate: { type: Date || " "},
  batchNumber: { type: String ||" "},
  additionalInfo: { type: String },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },
  rejectionComment: { type: String }
});

module.exports = mongoose.model('Drug', drugSchema);
