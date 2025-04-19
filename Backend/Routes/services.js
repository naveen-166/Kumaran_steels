// const express = require('express');
// const router = express.Router();
// const Service = require('../Model/Services');

// // GET all services
// router.get('/', async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.json(services);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // GET single service
// router.get('/:id', async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) return res.status(404).json({ message: 'Not found' });
//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// // CREATE new service
// router.post('/', async (req, res) => {
//   try {
//     const newService = new Service(req.body);
//     await newService.save();
//     res.status(201).json(newService);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // UPDATE service
// router.put('/:id', async (req, res) => {
//   try {
//     const updatedService = await Service.findByIdAndUpdate(
//       req.params.id,
//       req.body,
//       { new: true }
//     );
//     res.json(updatedService);
//   } catch (error) {
//     res.status(400).json({ message: error.message });
//   }
// });

// // DELETE service
// router.delete('/:id', async (req, res) => {
//   try {
//     await Service.findByIdAndDelete(req.params.id);
//     res.json({ message: 'Service deleted' });
//   } catch (error) {
//     res.status(500).json({ message: error.message });
//   }
// });

// module.exports = router;

const express = require('express');
const router = express.Router();
const Product = require('../Model/Services');

// Get all products
router.get('/', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// Get single product by ID
router.get('/:productId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Add new product
router.post('/', async (req, res) => {
  const newProduct = new Product(req.body);
  await newProduct.save();
  res.json(newProduct);
});

// Update product
router.put('/:productId', async (req, res) => {
  const updated = await Product.findByIdAndUpdate(req.params.productId, req.body, { new: true });
  res.json(updated);
});

// Delete product
router.delete('/:productId', async (req, res) => {
  await Product.findByIdAndDelete(req.params.productId);
  res.json({ message: 'Product deleted' });
});

// ✅ Add sample image
router.post('/:productId/sampleimage', async (req, res) => {
  const { img } = req.body;
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    product.simage.push({ img });
    await product.save();
    res.json(product);
  } catch (err) {
    console.error('Error adding sample image:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ Delete sample image
router.delete('/:productId/sampleimage/:sampleImageId', async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId);
    if (!product) return res.status(404).json({ error: 'Product not found' });

    const originalLength = product.simage.length;
    product.simage = product.simage.filter(
      (imgDoc) => imgDoc._id.toString() !== req.params.sampleImageId
    );

    if (product.simage.length === originalLength) {
      return res.status(404).json({ error: 'Sample image not found' });
    }

    await product.save();
    res.json({ message: 'Sample image deleted', product });
  } catch (err) {
    console.error('Error deleting sample image:', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;