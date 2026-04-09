const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
  },
  district: {
    type: String,
  },
  photo: {
    type: String,
    default: ""
  },
  role: {
    type: String,
    enum: ['tourist', 'admin'],
    default: 'tourist'
  },
  visitedPlaces: [{
    destinationId: Number,
    rating: Number,
    visitedAt: { type: Date, default: Date.now }
  }],
  loginDates: [{
    type: Date
  }],
  lastActive: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;
