const mongoose = require('mongoose');

const districtSchema = mongoose.Schema({
  id: {
    type: String,
    required: true,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  }
}, {
  timestamps: true,
});

const District = mongoose.model('District', districtSchema);
module.exports = District;
