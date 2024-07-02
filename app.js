require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const helmet = require('helmet');

const User = require('./server/models/User'); // Adjusted path based on your file structure
const productsRoutes = require('./server/routes/productsRoutes');
const paymentRoutes = require('./server/routes/paymentRoutes');
const userRoutes = require('./server/routes/userRoutes');
const cartRoutes = require('./server/routes/cartRoutes'); // Ensure this file exists or adjust accordingly
const adminRoutes = require('./server/routes/adminRoutes'); // Ensure this file exists or adjust accordingly
const quoteRoutes = require('./server/routes/quoteRoutes'); // Ensure this file exists or adjust accordingly
const invoiceRoutes = require('./server/routes/invoiceRoutes'); // Ensure this file exists or adjust accordingly

const app = express();

// Middleware to enhance security
app.use(helmet());

// Middleware to parse JSON and URL-encoded data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'client')));

// Connect to MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/your_database_name';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

// Set up view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'server/views'));

// Define routes
app.use('/api/users', userRoutes);
app.use('/api/products', productsRoutes);
app.use('/api/cart', cartRoutes); // Check if this route is correctly defined
app.use('/api/admin', adminRoutes); // Check if this route is correctly defined
app.use('/api/quotes', quoteRoutes); // Check if this route is correctly defined
app.use('/api/invoices', invoiceRoutes); // Check if this route is correctly defined
app.use('/api/payment', paymentRoutes);

// Serve static HTML files
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'index.html'));
});

app.get('/pricing', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'pricing.html'));
});

app.get('/features', (req, res) => {
  res.sendFile(path.join(__dirname, 'client', 'html', 'features.html'));
});

// User registration (signup) route
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
    const hashedPassword = await bcrypt.hash(password, 10); // Salt rounds

    // Create a new user instance
    const newUser = new User({
      name,
      email,
      password: hashedPassword
    });

    // Save user to database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error('Signup error:', err);
    res.status(500).json({ error: 'Signup failed. Please try again.' });
  }
});

// User login route
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;
