const express = require('express');
const app = express();

// Root Route
app.get('/', (req, res) => {
  res.send('Backend is working!');
});

// Export the app for Vercel
module.exports = app;
