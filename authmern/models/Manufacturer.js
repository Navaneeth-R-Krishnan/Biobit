const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const manufacturerSchema = new mongoose.Schema({
  uniqueId: { type: String }, // Remove 'required: true'
  name: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  contactNumber: { type: String, required: true },
  address: { type: String, default: "" } // Optional field
});

// Hash password before saving
manufacturerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
