const mongoose = require('mongoose');

const brandSchema = new mongoose.Schema({
  name: { type: String, required: true },
  img: { type: String, required: true },
  grade: String,
  tags: [String]
});

const productSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: String,
  image: String,
  tags: [String],
  brands: [brandSchema] // Embedded subdocuments
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;
