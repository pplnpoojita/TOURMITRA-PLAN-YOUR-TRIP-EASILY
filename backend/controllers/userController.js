const User = require('../models/User');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getUserProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        visitedPlaces: user.visitedPlaces,
        loginDates: user.loginDates,
      });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get all users (for admin stats)
// @route   GET /api/users
// @access  Public (simplified for admin dashboard)
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
}

// @desc    Add or update visited place rating
// @route   PUT /api/users/visit
// @access  Private
const addVisitedPlace = async (req, res) => {
  const { destinationId, rating } = req.body;

  try {
    const user = await User.findById(req.user._id);

    if (user) {
      if (!user.visitedPlaces) {
        user.visitedPlaces = [];
      }
      const alreadyVisited = user.visitedPlaces.find(
        (p) => p.destinationId === Number(destinationId)
      );

      if (alreadyVisited) {
        if (rating !== undefined) alreadyVisited.rating = Number(rating);
        alreadyVisited.visitedAt = Date.now();
      } else {
        user.visitedPlaces.push({
          destinationId: Number(destinationId),
          rating: rating !== undefined ? Number(rating) : 0,
          visitedAt: Date.now()
        });
      }

      user.markModified('visitedPlaces');
      await user.save();
      res.json(user.visitedPlaces);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Update user profile photo
// @route   PUT /api/users/photo
// @access  Private
const updateProfilePhoto = async (req, res) => {
  const { photo } = req.body;

  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.photo = photo;
      await user.save();
      res.json({ message: 'Photo updated successfully', photo: user.photo });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Ping to keep user session alive
// @route   PUT /api/users/ping
// @access  Private
const pingUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.lastActive = Date.now();
      await user.save();
      res.json({ message: 'Ping successful' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Logout user and reset active status
// @route   PUT /api/users/logout
// @access  Private
const logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (user) {
      user.lastActive = new Date(0); // Reset to past to make offline
      await user.save();
      res.json({ message: 'Logout successful' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Get count of online users
// @route   GET /api/users/online
// @access  Public
const getOnlineUsersCount = async (req, res) => {
  try {
    const fiveMinutesAgo = new Date(Date.now() - 5 * 60 * 1000);
    // Exclude admins from the online users list
    const onlineUsers = await User.find({ 
      lastActive: { $gte: fiveMinutesAgo },
      role: { $ne: 'admin' }
    }).select('name role');
    res.json({ 
      onlineCount: onlineUsers.length,
      onlineUsers: onlineUsers
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { getUserProfile, getAllUsers, addVisitedPlace, updateProfilePhoto, pingUser, logoutUser, getOnlineUsersCount };
