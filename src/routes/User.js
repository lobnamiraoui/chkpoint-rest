const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Failed to connect to MongoDB:', err));

// Routes

// GET: Get all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();  // Mongoose method to find all users
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch users' });
  }
});

// POST: Add a new user
app.post('/users', async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = new User({ name, email, age });  // Create a new user instance
    await newUser.save();  // Save the new user to the database
    res.status(201).json(newUser);  // Return the created user
  } catch (error) {
    res.status(500).json({ error: 'Failed to add user' });
  }
});

// PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
  const { id } = req.params;
  const { name, email, age } = req.body;
  try {
    const updatedUser = await User.findByIdAndUpdate(id, { name, email, age }, { new: true });
    if (!updatedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json(updatedUser);  // Return the updated user
  } catch (error) {
    res.status(500).json({ error: 'Failed to update user' });
  }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);  // Find and delete the user by ID
    if (!deletedUser) return res.status(404).json({ error: 'User not found' });
    res.status(200).json({ message: 'User deleted successfully' });  // Return success message
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete user' });
  }
});

// Start the server
app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});