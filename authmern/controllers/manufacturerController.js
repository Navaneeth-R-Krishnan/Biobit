const ManufacturerDrug = require('../models/ManufacturerDrug');
const Drug = require('../models/Drug');

exports.addDrugWithQR = async (req, res) => {
    const {
        manufacturerId,
        drugName,
        qrCodeData,
        productionDate,
        expirationDate,
        batchNumber,
        additionalInfo,
        manufacturerName
    } = req.body;

    try {
        // Convert QR data to base64 if not already encoded
        const base64QrCode = Buffer.from(qrCodeData, 'base64').toString('base64');

        // Save to `manufactureddrugs` collection
        const newManufacturerDrug = new ManufacturerDrug({
            manufacturerId,
            drugName,
            qrCodeData: base64QrCode,
            productionDate,
            expirationDate,
            batchNumber,
            additionalInfo,
            manufacturerName
        });
        await newManufacturerDrug.save();
        console.log("Successfully added to manufactureddrugs collection");

        // Save to `drugs` collection
        const newDrugEntry = new Drug({
            manufacturerId,
            drugName,
            qrCodeData: base64QrCode,
            productionDate,
            expirationDate,
            batchNumber,
            additionalInfo,
            manufacturerName
        });
        await newDrugEntry.save();
        console.log("Successfully added to drugs collection");

        res.status(201).json({
            message: "Drug information added successfully to both collections",
            drug: newManufacturerDrug
        });
    } catch (error) {
        console.error("Error adding drug information:", error);
        res.status(500).json({
            error: "Failed to add drug information to drugs collection",
            details: error.message
        });
    }
};
