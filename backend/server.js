const express = require('express')
const cors = require('cors');
const connectToMongo = require('./db');
connectToMongo();  // Call the function to connect to MongoDB'

app.use(cors({
  origin: 'https://ggnotebook.vercel.app',  
  methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],   
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,   
}));
const app = express()
const port = 5000


// app.options('*', (req, res) => {
//   res.header('Access-Control-Allow-Origin', 'https://ggnotebook.vercel.app');
//   res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
//   res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
//   res.header('Access-Control-Allow-Credentials', 'true');
//   res.sendStatus(204);
// });

app.use(express.json()); // middleware to parse json

// Available Routes 
app.use('/api/auth', require('./routes/auth'))
app.use('/api/notes', require('./routes/notes'))
// app.use('/api/auth', require('./api/auth'))
// app.use('/api/notes', require('./api/notes'))



app.listen(port, () => {
  console.log(`ggNotebook Cloud Backend listening on port ${port}`)
})

// module.exports = app; 