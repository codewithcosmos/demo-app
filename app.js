// Kasiwebsites/app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailjs = require('emailjs-com'); // Ensure you have emailjs-com installed

// Import routes
const paymentRoutes = require('./server/routes/paymentRoutes');
const productsRoutes = require('./server/routes/productsRoutes');
const userRoutes = require('./server/routes/userRoutes');
const cartRoutes = require('./server/routes/cartRoutes');
const adminRoutes = require('./server/routes/adminRoutes');
const quoteRoutes = require('./server/routes/quoteRoutes');
const invoiceRoutes = require('./server/routes/invoiceRoutes');

// Create Express app
const app = express();

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files from the public directory
app.use(express.static('public'));

// Serve static files from the "client" directory
app.use(express.static(path.join(__dirname, '../client')));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Set EJS as the templating engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'server/views'));

// Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/quotes', quoteRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/payment', paymentRoutes);

// Default route to serve the index.html file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'html', 'index.html'));
});

// Route to serve pricing.html
app.get('/pricing', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'html', 'pricing.html'));
});

// Route to serve features.html
app.get('/features', (req, res) => {
    res.sendFile(path.join(__dirname, '../client', 'html', 'features.html'));
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
// Route to handle user registration (signup)
app.post('/signup', async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // Validate inputs
        if (!name || !email || !password) {
            return res.status(400).json({ message: 'Please provide name, email, and password' });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Hash password before storing in database
        const hashedPassword = await bcrypt.hash(password, 10); // 10 is the salt rounds

        // Create a new user instance
        const newUser = new User({
            name,
            email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        console.error('Signup error:', err);
        res.status(500).json({ error: 'Signup failed. Please try again.' });
    }
});

// Route to handle payment form submission
app.post('/payment', (req, res) => {
    const { fullName, email, address, city, province, postalCode, paymentMethod, cardNumber, expiration, cvv } = req.body;

    // Log the payment details (for debugging purposes)
    console.log('Payment Details:', req.body);

    // Implement your payment processing logic here
    // For example, integrate with a payment gateway like Stripe or PayFast

    // Send a confirmation email using EmailJS
    const templateParams = {
        fullName,
        email,
        address,
        city,
        province,
        postalCode,
        paymentMethod,
        cardNumber,
        expiration,
        cvv
    };

    emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID_PAYMENT, templateParams, process.env.EMAILJS_USER_ID)
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
            res.json({ message: 'Payment processed and email sent successfully' });
        })
        .catch((err) => {
            console.error('Failed to send email:', err);
            res.status(500).json({ message: 'Payment processed but failed to send email' });
        });
});

// Route to handle PayFast form submission
app.post('/payfast', (req, res) => {
    const { fullName, email, address, city, province, postalCode, paymentMethod } = req.body;

    const paymentData = {
        merchant_id: process.env.PAYFAST_MERCHANT_ID,
        merchant_key: process.env.PAYFAST_MERCHANT_KEY,
        return_url: process.env.PAYFAST_RETURN_URL,
        cancel_url: process.env.PAYFAST_CANCEL_URL,
        notify_url: process.env.PAYFAST_NOTIFY_URL,
        name_first: fullName.split(' ')[0],
        name_last: fullName.split(' ')[1],
        email_address: email,
        m_payment_id: `PF-${new Date().getTime()}`, // Unique payment ID
        amount: '500.00', // Example amount
        item_name: 'Example Product',
        item_description: 'This is an example product description.',
        email_confirmation: 1,
        confirmation_address: email,
    };

    // Generate the signature
    const queryString = new URLSearchParams(paymentData).toString();
    const signature = crypto.createHash('md5').update(queryString).digest('hex');

    // Add the signature to the payment data
    paymentData.signature = signature;

    // Redirect to PayFast
    const paymentUrl = `https://www.payfast.co.za/eng/process?${queryString}&signature=${signature}`;
    res.redirect(paymentUrl);
});

// Route to handle local bank details submission
app.post('/localbank', (req, res) => {
    const { fullName, email, bankName, accountNumber, branchCode } = req.body;

    // Implement logic to save local bank details to your database or process them as needed

    // Example: Send a confirmation email using EmailJS
    const templateParams = {
        fullName,
        email,
        bankName,
        accountNumber,
        branchCode,
    };

    emailjs.send(process.env.EMAILJS_SERVICE_ID, process.env.EMAILJS_TEMPLATE_ID_LOCAL_BANK, templateParams, process.env.EMAILJS_USER_ID)
        .then((response) => {
            console.log('Email sent successfully!', response.status, response.text);
            res.json({ message: 'Local bank details submitted and email sent successfully' });
        })
        .catch((err) => {
            console.error('Failed to send email:', err);
            res.status(500).json({ message: 'Failed to submit local bank details or send email' });
        });
});

// Define a schema for User
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model('User', userSchema);

// Sign-up endpoint
app.post('/signup', async (req, res) => {
    try {
        // Hash password before storing in database
        const hashedPassword = await bcrypt.hash(req.body.password, 10); // 10 is the salt rounds

        // Create a new user instance
        const newUser = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        // Save the user to the database
        await newUser.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Login endpoint
app.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;

        // Find user by email
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Compare password
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ message: 'Invalid password' });
        }

        res.status(200).json({ message: 'Login successful' });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
