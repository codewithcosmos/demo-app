// server/routes/invoiceRoutes.js

const express = require('express');
const router = express.Router();
const Invoice = require('../models/Invoice'); // Adjust path based on your structure

// GET request to fetch all invoices
router.get('/', async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

// POST request to create a new invoice
router.post('/', async (req, res) => {
  const { customerName, products, totalAmount } = req.body;

  try {
    // Create a new invoice instance
    const newInvoice = new Invoice({
      customerName,
      products,
      totalAmount
    });

    // Save the new invoice to the database
    const savedInvoice = await newInvoice.save();

    res.status(201).json(savedInvoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});

module.exports = router;
