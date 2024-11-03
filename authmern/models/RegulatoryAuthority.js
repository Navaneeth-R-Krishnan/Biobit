const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const regulatoryAuthoritySchema = new mongoose.Schema({
  uniqueId: {
    type: String,
    required: true,
    unique: true,
    match: /^RA\d{7}$/,
  },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  department: String,
  contactInfo: String,
});

// Hash password before saving
regulatoryAuthoritySchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10);
  }
  next();
});

module.exports = mongoose.model('RegulatoryAuthority', regulatoryAuthoritySchema);
