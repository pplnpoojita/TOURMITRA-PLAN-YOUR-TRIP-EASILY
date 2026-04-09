const District = require('../models/District');
const Destination = require('../models/Destination');

// @desc    Get all districts
// @route   GET /api/districts
// @access  Public
const getDistricts = async (req, res) => {
  try {
    const districts = await District.find({});
    res.json(districts);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get destinations by district ID
// @route   GET /api/districts/:districtId/destinations
// @access  Public
const getDestinationsByDistrict = async (req, res) => {
  try {
    const district = await District.findOne({ id: req.params.districtId });
    if (!district) {
      return res.status(404).json({ message: 'District not found' });
    }

    const destinations = await Destination.find({ districtId: district._id });
    res.json(destinations);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getDistricts, getDestinationsByDistrict };
