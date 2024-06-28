// server/app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const app = express();

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, 'client')));

// Default route to serve the index.html file
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'index.html'));
});

// Route to serve pricing.html
app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'pricing.html'));
})

// Route to serve features.html
app.get('/features', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'features.html'));
});

// Route to serve the payment page using EJS
app.get('/payment', (req, res) => {
    res.render('payment', {
        bankAccountName: process.env.BANK_ACCOUNT_NAME,
        bankName: process.env.BANK_NAME,
        bankAccountNumber: process.env.BANK_ACCOUNT_NUMBER,
        bankBranchCode: process.env.BANK_BRANCH_CODE
    });
});


// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
