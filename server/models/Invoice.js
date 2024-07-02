// server/models/Invoice.js
const mongoose = require('mongoose');

// Basic invoice schema with customer details
const basicInvoiceSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  products: [{ type: String, required: true }],
  totalAmount: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

// Detailed invoice schema with user reference
const detailedInvoiceSchema = new mongoose.Schema({
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  }
}, {
  timestamps: true
});

// Choose which schema to use based on requirements
const useDetailedSchema = true; // Set to true if using the detailed schema

const Invoice = mongoose.model('Invoice', useDetailedSchema ? detailedInvoiceSchema : basicInvoiceSchema);

module.exports = Invoice;
