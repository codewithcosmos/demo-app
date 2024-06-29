// server/routes/payment.js

const express = require('express');
const router = express.Router();
const axios = require('axios');

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

router.post('/pay', async (req, res) => {
    const { amount, item_name } = req.body;
    const paymentData = {
      merchant_id: process.env.PAYFAST_MERCHANT_ID,
      merchant_key: process.env.PAYFAST_MERCHANT_KEY,
      amount,
      item_name,
      return_url: process.env.PAYFAST_RETURN_URL,
      cancel_url: process.env.PAYFAST_CANCEL_URL,
      notify_url: process.env.PAYFAST_NOTIFY_URL,
    };
try {
    const response = await axios.post('https://www.payfast.co.za/eng/process', paymentData);
    res.json(response.data);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;