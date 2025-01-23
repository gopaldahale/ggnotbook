const express = require('express');
const cors = require('cors');
const connectToMongo = require('./db');

// Connect to MongoDB
connectToMongo();

const app = express();

// Middleware
app.use(express.json());

// CORS Options
const corsOptions = {
  origin: ['https://ggnotebook-frontend.vercel.app'],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'auth-token'], 
  credentials: true,
};
app.use(cors(corsOptions));
app.options('*', cors(corsOptions));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/notes', require('./routes/notes'));

// Root Route
app.get('/', (req, res) => {
  res.send('Welcome to the main API!');
});

// Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// app.listen(5000, () => {
//   console.log(`Server running on port 5000`);
// });

// Export the app for Vercel
module.exports = app;
