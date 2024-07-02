// server/controllers/productController.js

const Product = require('../models/Product'); // Adjust path based on your structure

// Fetch all products
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Add a new product
exports.addProduct = async (req, res) => {
  const { name, price, description, imageUrl } = req.body;
  try {
    const newProduct = new Product({ name, price, description, imageUrl });
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};
