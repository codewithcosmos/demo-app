const User = require('../models/user'); // Assuming you have a User model set up
const bcrypt = require('bcryptjs');

exports.signup = async (req, res) => {
  const { username, email, password } = req.body;
  
  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create a new user
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).send('User created successfully');
  } catch (error) {
    res.status(500).send('Server error');
  }
};
