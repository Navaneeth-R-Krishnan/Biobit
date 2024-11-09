const ManufacturerDrug = require('../models/ManufacturerDrug');
const Drug = require('../models/Drug'); 


exports.addDrugWithQR = async (req, res) => {
  const { manufacturerId, drugName, qrCodeData, productionDate, expirationDate, batchNumber, additionalInfo } = req.body;

  try {
    // Convert QR data to base64 format
    const base64QrCode = Buffer.from(qrCodeData).toString('base64');

    // Create and save to manufactureddrugs collection
    const newManufacturerDrug = new ManufacturerDrug({
      manufacturerId,
      drugName,
      qrCodeData: base64QrCode,
      productionDate,
      expirationDate,
      batchNumber,
      additionalInfo,
    });
    await newManufacturerDrug.save();
    console.log("Added to manufactureddrugs collection");

    // Create and save to drugs collection
    const newDrugEntry = new Drug({
      manufacturerId,
      drugName,
      qrCodeData: base64QrCode,
      productionDate,
      expirationDate,
      batchNumber,
      additionalInfo,
    });

    console.log("Preparing to save to drugs collection...");
    await newDrugEntry.save();
    console.log("Successfully added to drugs collection");

    res.status(201).json({ message: 'Drug information added successfully to both collections', drug: newManufacturerDrug });
  } catch (error) {
    console.error("Error adding drug information to drugs collection:", error);
    res.status(500).json({ error: 'Failed to add drug information to drugs collection', details: error.message });
  }
};
