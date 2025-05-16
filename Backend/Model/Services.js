// models/Service.js

const mongoose = require('mongoose');

const SampleImagesSchema = new mongoose.Schema({
  img: { type: String, required: true },
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  tags: [String],
  simage: [SampleImagesSchema], 
});

const Product = mongoose.model('Service', productSchema);
module.exports = Product;
