// Import necessary modules
const express = require('express');
const cors = require('cors');
const db = require('./config/db'); // MySQL connection
const authRoutes = require('./routes/auth');
const reviewRoutes = require('./routes/review'); 

// Create an instance of Express
const app = express();

// Use CORS to allow cross-origin requests (React to backend)
app.use(cors());

// Middleware to accept JSON data
app.use(express.json());

app.use('/api/auth', authRoutes);

// Define a simple route for the homepage
app.get('/', (req, res) => {
  res.send('Welcome to Book Review API 📚');
});

app.use('/api/reviews', reviewRoutes);

// Set the port where the server will listen
const PORT = 5000;

// Start the server and listen for incoming requests
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});