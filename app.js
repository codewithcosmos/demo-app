// Kasiwebsites/app.js
require('dotenv').config();
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const emailjs = require('emailjs-com');
const crypto = require('crypto'); // Add crypto module for signature generation

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

// Define a schema for User
const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true },
    password: String
});
const User = mongoose.model('User', userSchema);

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

// Route to handle user login
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
