// server/controllers/invoiceController.js
const Invoice = require('../models/Invoice');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Fetch all invoices
exports.getAllInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find();
    res.json(invoices);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// Create a new invoice
exports.createInvoice = async (req, res) => {
  const { customerName, products, totalAmount } = req.body;
  try {
    const newInvoice = new Invoice({
      customerName,
      products,
      totalAmount
    });
    const savedInvoice = await newInvoice.save();
    res.status(201).json(savedInvoice);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
};

// View a specific invoice
exports.viewInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    res.status(200).json(invoice);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Print a specific invoice
exports.printInvoice = async (req, res) => {
  try {
    const { id } = req.params;
    const invoice = await Invoice.findById(id);
    if (!invoice) {
      return res.status(404).json({ message: 'Invoice not found' });
    }
    const doc = new PDFDocument();
    const filePath = `./invoices/invoice_${id}.pdf`;
    doc.pipe(fs.createWriteStream(filePath));
    doc.text(`Invoice ID: ${invoice._id}`);
    doc.text(`Customer Name: ${invoice.customerName}`);
    doc.text(`Products: ${invoice.products.join(', ')}`);
    doc.text(`Total Amount: ${invoice.totalAmount}`);
    doc.text(`Created At: ${invoice.createdAt}`);
    doc.end();
    res.status(200).json({ message: 'Invoice printed', filePath });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
