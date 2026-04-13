const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('../models/User');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res) => {
  const { name, password, role, phone, district } = req.body;
  const email = req.body.email ? req.body.email.trim().toLowerCase() : '';

  try {
    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      role: role || 'tourist',
      phone,
      district,
      loginDates: [new Date()],
      lastActive: Date.now()
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ message: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Auth user & get token
// @route   POST /api/auth/login
// @access  Public
const authUser = async (req, res) => {
  const email = req.body.email ? req.body.email.trim().toLowerCase() : '';
  const password = req.body.password;

  try {
    // Fixed Admin Credentials Enforced
    if (email === "tourmitra0821@gmail.com") {
      if (password !== "tourmitra@08") {
        return res.status(401).json({ message: 'Invalid Admin Credentials' });
      }

      let user = await User.findOne({ email });
      if (!user) {
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        user = await User.create({
          name: "Poojita",
          email,
          password: hashedPassword,
          role: 'admin',
          loginDates: [new Date()],
          lastActive: Date.now()
        });
      } else {
        user.loginDates.push(new Date());
        user.lastActive = Date.now();
        // Ensure name and role are strictly enforced
        user.name = "Poojita";
        user.role = 'admin';
        await user.save();
      }

      return res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    }

    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      user.loginDates.push(new Date());
      user.lastActive = Date.now();
      await user.save();

      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ message: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  const email = req.body.email ? req.body.email.trim().toLowerCase() : '';
  const newPassword = req.body.newPassword;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if (user.role === 'admin') {
      return res.status(400).json({ message: 'Cannot reset admin password here' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(newPassword, salt);

    user.password = hashedPassword;
    await user.save();

    res.json({ message: 'Password reset successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

module.exports = { registerUser, authUser, resetPassword };
