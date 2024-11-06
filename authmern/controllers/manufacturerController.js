// controllers/manufacturerController.js
const ManufacturerDrug = require('../models/ManufacturerDrug');

exports.addDrugWithQR = async (req, res) => {
  const { manufacturerId, drugName, qrCodeData, productionDate, expirationDate, batchNumber, additionalInfo } = req.body;

  try {
    // Convert QR data to base64 format
    const base64QrCode = Buffer.from(qrCodeData).toString('base64');

    // Create a new drug entry
    const newDrug = new ManufacturerDrug({
      manufacturerId,
      drugName,
      qrCodeData: base64QrCode,
      productionDate,
      expirationDate,
      batchNumber,
      additionalInfo,
    });

    // Save to MongoDB
    await newDrug.save();
    res.status(201).json({ message: 'Drug information added successfully', drug: newDrug });
  } catch (error) {
    res.status(500).json({ error: 'Failed to add drug information' });
  }
};
