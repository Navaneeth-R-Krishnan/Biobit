// models/ApprovedDrug.js
const mongoose = require('mongoose');

const approvedDrugSchema = new mongoose.Schema({
  manufacturerId: { type: String, required: true },
  drugName: { type: String, required: true },
  qrCodeData: { type: String, required: true },
  productionDate: { type: Date, required: true },
  expirationDate: { type: Date, required: true },
  batchNumber: { type: String, required: true },
  additionalInfo: { type: String },
  approvalDate: { type: Date, default: Date.now }, // Timestamp for when drug was approved
});

module.exports = mongoose.model('ApprovedDrug', approvedDrugSchema);
