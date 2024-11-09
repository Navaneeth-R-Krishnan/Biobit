// models/ManufacturerDrug.js
const mongoose = require('mongoose');

const manufacturerDrugSchema = new mongoose.Schema({
  manufacturerId: { type: String, required: true },
  drugName: { type: String, required: true },
  qrCodeData: { type: String, required: true },  // base64-encoded QR data
  productionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  batchNumber: { type: String, required: true },
  additionalInfo: { type: String },
  status: { 
    type: String, 
    enum: ["pending", "approved", "rejected"], 
    default: "pending" 
  },
  rejectionComment: { type: String }
});

module.exports = mongoose.model('ManufacturerDrug', manufacturerDrugSchema);
