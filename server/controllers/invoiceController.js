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
    
// Create a new invoice
exports.createInvoice = async (req, res) => {
    const { customerName, invoiceAmount, items } = req.body;
    try {
      const newInvoice = new Invoice({ customerName, invoiceAmount, items });
      const invoice = await newInvoice.save();
      res.status(201).json(invoice);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

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

exports.printInvoice = async (req, res) => {
    try {
        const { id } = req.params;
        const invoice = await Invoice.findById(id);
        if (!invoice) {
            return res.status(404).json({ message: 'Invoice not found' });
        }
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(`./invoices/invoice_${id}.pdf`));
        doc.text(`Invoice ID: ${invoice._id}`);
        doc.text(`Amount: ${invoice.amount}`);
        doc.text(`Date: ${invoice.date}`);
        doc.end();
        res.status(200).json({ message: 'Invoice printed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
