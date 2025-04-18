const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const User = require('../Model/User');

// 🔐 REGISTER
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });

  } catch (err) {
    console.error('Registration error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

// 🔐 LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not found' });

    // Check password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    // Add login session
    user.loginHistory.push({
      ip: req.ip,
      location: {
        city: 'Unknown',
        region: 'Unknown',
        country: 'Unknown',
        latitude: 0,
        longitude: 0
      }
    });

    await user.save();

    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name || 'Guest',
        email: user.email,
        loginHistory: user.loginHistory
      }
    });

  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;
