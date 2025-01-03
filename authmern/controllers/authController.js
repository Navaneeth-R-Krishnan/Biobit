const Manufacturer = require('../models/Manufacturer');
const RegulatoryAuthority = require('../models/RegulatoryAuthority');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

exports.registerManufacturer = async (req, res) => {
  try {
    const { uniqueId, name, email, password, contactNumber, address } = req.body;
    //console.log(req.body);

    // Ensure 'address' can be optional (it can be an empty string if not provided)
    const newManufacturer = new Manufacturer({
      uniqueId,  // Use the uniqueId from frontend
      name,
      email,
      password,
      contactNumber,
      address: address || "",  // Default to empty string if address is not provided
    });

    await newManufacturer.save();
    res.status(201).json({ message: 'Manufacturer registered successfully' });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Register Regulatory Authority
const authorizedIps = ['::1', '98.76.54.32']; // Replace with actual authorized IPs

exports.registerRegulatoryAuthority = async (req, res) => {
  try {
    const clientIp = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    console.log(clientIp);

    // Validate the IP
    if (!authorizedIps.includes(clientIp)) {
      return res.status(403).json({ error: 'Unauthorized IP address. Registration not allowed.' });
    }

    const { uniqueId, name, email, password, department, contactInfo } = req.body;

    // Validate required fields
    if (!uniqueId || !name || !email || !password || !department || !contactInfo) {
      return res.status(400).json({ error: 'All fields are required.' });
    }

    // Save the regulatory authority details to the database
    const newRegulatoryAuthority = new RegulatoryAuthority({
      uniqueId,
      name,
      email,
      password,
      department,
      contactInfo,
    });

    await newRegulatoryAuthority.save();
    res.status(201).json({ message: 'Regulatory authority registered successfully' });
  } catch (error) {
    console.error('Error during registration:', error);
    res.status(500).json({ error: 'Failed to register regulatory authority' });
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
