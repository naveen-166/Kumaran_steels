const express = require('express');
const router = express.Router();
const Product = require('../Model/Product');

// ✅ Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// ✅ Get single product by ID
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Add new product
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// ✅ Update product
router.put('/:productId', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
  res.json(updated);
});

// ✅ Delete product
router.delete('/:productId', async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.json({ message: 'Product deleted' });
});

// ✅ Add brand to product
router.post('/:productId/brands', async (req, res) => {
  const product = await Product.findById(req.params.productId);
  product.brands.push(req.body);
  await product.save();
  res.json(product);
});

// ✅ Update brand
router.put('/:productId/brands/:brandId', async (req, res) => {
  const product = await Product.findById(req.params.productId);
  const brand = product.brands.id(req.params.brandId);
  if (!brand) return res.status(404).json({ error: 'Brand not found' });
  Object.assign(brand, req.body);
  await product.save();
  res.json(product);
});

// ✅ Delete brand
router.delete('/:productId/brands/:brandId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const originalLength = product.brands.length;
    product.brands = product.brands.filter(b => b._id.toString() !== req.params.brandId);

    if (product.brands.length === originalLength) {
      return res.status(404).json({ error: 'Brand not found' });
    }

    await product.save();
    res.json({ message: 'Brand deleted' });
  } catch (err) {
    console.error('Error deleting brand:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
