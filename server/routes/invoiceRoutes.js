// server/routes/invoiceRoutes.js

// Required modules
const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController'); // Adjust path based on your structure

// GET request to fetch all invoices
router.get('/', invoiceController.getAllInvoices);

// POST request to create a new invoice
router.post('/', invoiceController.createInvoice);

// Export the router
module.exports = router;
