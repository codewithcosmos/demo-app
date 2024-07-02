// server/routes/productsRoutes.js

const express = require('express');
const router = express.Router();
const Product = require('../models/Product'); // Adjust path as per your project structure

// Route to get all products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

// Route to add a new product
router.post('/', async (req, res) => {
    const { name, price, description, imageUrl } = req.body;
    try {
        const newProduct = new Product({ name, price, description, imageUrl });
        const product = await newProduct.save();
        res.status(201).json(product);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Server Error' });
    }
});

module.exports = router;
