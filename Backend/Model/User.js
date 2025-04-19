const mongoose = require('mongoose');
const BasicUserSchema = new mongoose.Schema({
  Email: { type: String },
  password: { type: String }
});

const LoginSessionSchema = new mongoose.Schema({
  loginTime: { type: Date, default: Date.now },
  ip: String,
  location: {
    city: String,
    region: String,
    country: String,
    latitude: Number,
    longitude: Number
  }
});

const UserSchema = new mongoose.Schema(
  {
    name: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    loginHistory: [LoginSessionSchema],
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', UserSchema);
