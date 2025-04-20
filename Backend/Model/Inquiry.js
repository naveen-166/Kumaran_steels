const mongoose = require('mongoose');

const inquirySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    lowercase: true,
  },
  category: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: Boolean,
    default: false, // false = pending, true = completed
  },
}, {
  timestamps: true,
});

module.exports = mongoose.model('Inquiry', inquirySchema);
