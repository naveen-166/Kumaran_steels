const express = require('express');
const router = express.Router();
const Inquiry = require('../Model/Inquiry');

router.post('/', async (req, res) => {
  const { name, email, category, phone, description } = req.body;

  try {
    const newInquiry = new Inquiry({ name, email, category, phone, description });
    await newInquiry.save();
    res.status(201).json({ message: 'Message received successfully!' });
  } catch (err) {
    console.error('Error saving contact message:', err);
    res.status(500).json({ error: 'Failed to send message' });
  }
});

module.exports = router;
