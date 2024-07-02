// server/controllers/quoteController.js
const Quote = require('../models/Quote');
const PDFDocument = require('pdfkit');
const fs = require('fs');

// Create a new quote
exports.createQuote = async (req, res) => {
    const { customerName, quoteAmount, items } = req.body;
    try {
      const newQuote = new Quote({ customerName, quoteAmount, items });
      const quote = await newQuote.save();
      res.status(201).json(quote);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  // Fetch all quotes
exports.getAllQuotes = async (req, res) => {
    try {
      const quotes = await Quote.find();
      res.json(quotes);
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: 'Server Error' });
    }
  };

  
exports.viewQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await Quote.findById(id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        res.status(200).json(quote);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.printQuote = async (req, res) => {
    try {
        const { id } = req.params;
        const quote = await Quote.findById(id);
        if (!quote) {
            return res.status(404).json({ message: 'Quote not found' });
        }
        const doc = new PDFDocument();
        doc.pipe(fs.createWriteStream(`./quotes/quote_${id}.pdf`));
        doc.text(`Quote ID: ${quote._id}`);
        doc.text(`Amount: ${quote.amount}`);
        doc.text(`Date: ${quote.date}`);
        doc.end();
        res.status(200).json({ message: 'Quote printed' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
