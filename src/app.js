// Import necessary modules
const express = require('express');
const dotenv = require('dotenv');
const userRoutes = require('routes/userRoutes');
const errorMiddleware = require('middleware/errorMiddleware');

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();

// Middleware: Parse JSON requests
app.use(express.json());

// Use routes
app.use('/api/users', userRoutes);

// Use error-handling middleware
app.use(errorMiddleware);

// Export the app
module.exports = app;