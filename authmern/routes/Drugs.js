// routes/drugs.js
const express = require('express');
const Drug = require('../models/Drug');
const router = express.Router();

// Approve a drug
router.patch('/approve/:id', async (req, res) => {
  try {
    const drug = await Drug.findByIdAndUpdate(req.params.id, { status: "approved" }, { new: true });
    res.status(200).json(drug);
  } catch (error) {
    res.status(500).json({ message: "Error approving drug", error });
  }
});

// Reject a drug with an optional comment
router.patch('/reject/:id', async (req, res) => {
  const { comment } = req.body;
  try {
    const drug = await Drug.findByIdAndUpdate(req.params.id, { status: "rejected", rejectionComment: comment }, { new: true });
    res.status(200).json(drug);
  } catch (error) {
    res.status(500).json({ message: "Error rejecting drug", error });
  }
});

module.exports = router;
