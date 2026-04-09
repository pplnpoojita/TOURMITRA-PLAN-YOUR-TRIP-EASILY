const express = require('express');
const router = express.Router();
const { getDistricts, getDestinationsByDistrict } = require('../controllers/districtController');

router.route('/').get(getDistricts);
router.route('/:districtId/destinations').get(getDestinationsByDistrict);

module.exports = router;
