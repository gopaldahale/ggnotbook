const express = require('express')
const cors = require('cors');
const connectToMongo = require('./db');
connectToMongo();  // Call the function to connect to MongoDB'

const app = express()
// const port = 5000

// app.use(cors());
app.use(cors({
  origin: 'https://ggnotebook.vercel.app',  
  methods: ["POST", "GET", "DELETE", "PUT", "OPTIONS"],   
  credentials: true,   
}));

app.options('*', cors());

app.use(express.json()); // middleware to parse json

// Available Routes 
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes'))
app.use('/api/auth', require('./api/auth'))
app.use('/api/notes', require('./api/notes'))



// app.listen(port, () => {
//   console.log(`ggNotebook Cloud Backend listening on port ${port}`)
// })

module.exports = app; 