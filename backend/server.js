const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const connectToMongo = require('./db');

// Connect to MongoDB
connectToMongo();

const app = express();

// Middleware
app.use(express.json());
app.use(morgan('dev'));

// CORS Options
const corsOptions = {
  origin: ['https://ggnotebook.vercel.app'],
  credentials: true, // Correct "Credential" to "credentials"
};
app.use(cors(corsOptions));

// Routes
app.use('/api/auth', require('./api/auth'));
app.use('/api/notes', require('./api/notes'));

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the main API!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// Export the app for Vercel
module.exports = app;
