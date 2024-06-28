// server/routes/payment.js

const express = require('express');
const router = express.Router();

router.get('/payment', (req, res) => {
    // Replace these values with your actual bank details
    const bankDetails = {
        bankAccountName: "Your Account Name",
        bankName: "Your Bank Name",
        bankAccountNumber: "123456789",
        bankBranchCode: "123456"
    };
    res.render('payment', bankDetails);
});

module.exports = router;
