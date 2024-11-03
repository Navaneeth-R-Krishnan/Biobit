const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const manufacturerSchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
    match: /^DM\d{8}$/,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  contactNumber: String,
});

// Hash password before saving
manufacturerSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('Manufacturer', manufacturerSchema);
