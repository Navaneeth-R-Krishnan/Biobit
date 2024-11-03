const Manufacturer = require('../models/Manufacturer');
const RegulatoryAuthority = require('../models/RegulatoryAuthority');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

// Register Manufacturer
exports.registerManufacturer = async (req, res) => {
  try {
    const { id, name, email, password, address, contactNumber } = req.body;
    const newManufacturer = new Manufacturer({
      uniqueId: id,
      name,
      email,
      password,
      address,
      contactNumber
    });
    await newManufacturer.save();
    res.status(201).json({ message: 'Manufacturer registered successfully' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

// Register Regulatory Authority
exports.registerRegulatoryAuthority = async (req, res) => {
  try {
      const { id, name, email, password, department, contactInfo } = req.body;

      const newRegulatoryAuthority = new RegulatoryAuthority({
          uniqueId: id,  // Map `id` from the request body to `uniqueId`
          name,
          email,
          password,
          department,
          contactInfo
      });

      await newRegulatoryAuthority.save();
      res.status(201).json({ message: 'Regulatory authority registered successfully' });
  } catch (error) {
      res.status(400).json({ error: error.message });
  }
};

// Login Function for Both Users
exports.login = async (req, res) => {
  const { email, password, role } = req.body;
  let user;

  try {
    if (role === 'manufacturer') {
      user = await Manufacturer.findOne({ email });
    } else if (role === 'regulatory') {
      user = await RegulatoryAuthority.findOne({ email });
    }

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    const token = jwt.sign({ id: user._id, role }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
