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
  const { email, password, ip, location } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid password' });

    // Create a login entry
    const loginEntry = {
      ip: ip || req.ip,
      location: {
        city: location?.city || 'Unknown',
        region: location?.region || 'Unknown',
        country: location?.country || 'Unknown',
        latitude: location?.latitude || 0,
        longitude: location?.longitude || 0
      }
    };

    // Push new login entry and maintain only last 5 logins
    user.loginHistory.push(loginEntry);
    if (user.loginHistory.length > 5) {
      user.loginHistory = user.loginHistory.slice(-5); // keep last 5
    }

    await user.save();

    res.status(200).json({
      message: 'Login successful',
      user: {
        name: user.name,
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
