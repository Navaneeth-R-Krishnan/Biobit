// // controllers/regulatoryController.js
// const Drug = require('../models/Drug'); // Assuming Drug schema stores drug info
// const HyperledgerService = require('../db/hyperledger');

// exports.getAllDrugs = async (req, res) => {
//     try {
//         const drugs = await Drug.find({}); // Fetch all drugs from MongoDB
//         res.json(drugs);
//     } catch (error) {
//         res.status(500).json({ error: 'Failed to retrieve drugs' });
//     }
// };

// exports.approveDrug = async (req, res) => {
//     const { id } = req.params; // drug ID
//     try {
//         const drug = await Drug.findById(id);
//         if (!drug) return res.status(404).json({ error: 'Drug not found' });

//         // Add to Hyperledger
//         await HyperledgerService.addDrug(drug.qrCodeData, drug); // Modify as needed
//         await drug.deleteOne(); // Remove from MongoDB

//         res.json({ message: 'Drug approved and added to Hyperledger' });
//     } catch (error) {
//         res.status(500).json({ error: 'Approval failed' });
//     }
// };

// exports.rejectDrug = async (req, res) => {
//     const { id } = req.params;
//     try {
//         await Drug.findByIdAndDelete(id); // Remove from MongoDB
//         res.json({ message: 'Drug rejected and removed' });
//     } catch (error) {
//         res.status(500).json({ error: 'Rejection failed' });
//     }
// };

const Drug = require('../models/Drug');
const ApprovedDrug = require('../models/ApprovedDrug'); // Import the ApprovedDrug model
const HyperledgerService = require('../db/hyperledger');

exports.getAllDrugs = async (req, res) => {
    try {
        const drugs = await Drug.find({}); // Fetch all drugs from MongoDB
        res.json(drugs);
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve drugs' });
    }
};

exports.approveDrug = async (req, res) => {
    const { id } = req.params; // drug ID
    try {
        const drug = await Drug.findById(id);
        if (!drug) return res.status(404).json({ error: 'Drug not found' });

        // Add to Hyperledger
        //await HyperledgerService.addDrug(drug.qrCodeData, drug); // Modify as needed

        // Create a new entry in the ApprovedDrug collection
        const approvedDrug = new ApprovedDrug({
            manufacturerId: drug.manufacturerId,
            drugName: drug.drugName,
            qrCodeData: drug.qrCodeData,
            productionDate: drug.productionDate,
            expirationDate: drug.expirationDate,
            batchNumber: drug.batchNumber,
            additionalInfo: drug.additionalInfo,
        });
        await approvedDrug.save();

        // Remove the drug from the Drug collection
        await drug.deleteOne();

        res.json({ message: 'Drug approved and added to Hyperledger and ApprovedDrugs collection' });
    } catch (error) {
        res.status(500).json({ error: 'Approval failed' });
    }
};

exports.rejectDrug = async (req, res) => {
    const { id } = req.params;
    try {
        await Drug.findByIdAndDelete(id); // Remove from MongoDB
        res.json({ message: 'Drug rejected and removed' });
    } catch (error) {
        res.status(500).json({ error: 'Rejection failed' });
    }
};

