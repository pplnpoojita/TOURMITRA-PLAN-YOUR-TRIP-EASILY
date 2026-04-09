const mongoose = require('mongoose');

const destinationSchema = mongoose.Schema({
  districtId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'District',
    required: true,
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
  },
  category: {
    type: String, // e.g., 'Temple', 'Beach', 'Nature'
    required: true,
  }
}, {
  timestamps: true,
});

const Destination = mongoose.model('Destination', destinationSchema);
module.exports = Destination;
