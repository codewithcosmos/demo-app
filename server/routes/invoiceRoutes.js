// server/routes/invoiceRoutes.js

const express = require('express');
const router = express.Router();
const invoiceController = require('../controllers/invoiceController'); // Adjust path based on your structure

// GET request to fetch all invoices
router.get('/', invoiceController.getAllInvoices);

// POST request to create a new invoice
router.post('/', invoiceController.createInvoice);

// GET request to view a specific invoice
router.get('/:id', invoiceController.viewInvoice);

// GET request to print a specific invoice
router.get('/:id/print', invoiceController.printInvoice);

// Export the router
module.exports = router;
