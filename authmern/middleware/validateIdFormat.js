// validateIdFormat.js
module.exports = function (type) {
  return (req, res, next) => {
      const { id } = req.body;

      if (type === 'manufacturer') {
          // Manufacturer ID should start with "DM" followed by 8 digits
          const manufacturerRegex = /^DM\d{8}$/;
          if (!manufacturerRegex.test(id)) {
              return res.status(400).json({ message: 'Invalid manufacturer ID format' });
          }
      } else if (type === 'regulatory') {
          // Regulatory ID should start with "RA" followed by 7 digits
          const regulatoryRegex = /^RA\d{7}$/;
          if (!regulatoryRegex.test(id)) {
              return res.status(400).json({ message: 'Invalid regulatory ID format' });
          }
      }

      next();
  };
};
