const express = require('express');
const mongoose = require('mongoose');
const db=require('./db/mongooes')
const cors = require('cors');
const dotenv = require('dotenv');
const serviceRoutes = require('./Routes/services.js');
const productRoutes=require('./Routes/Product.js')
const authRoutes=require('./Routes/Auth.js');
const contactRoutes=require('./Routes/contact.js')

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

app.use('/api/services', serviceRoutes);
app.use('/api/api',productRoutes)
app.use('/api/ad',authRoutes);
app.use('/api/contact',contactRoutes);

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});