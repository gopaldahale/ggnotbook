const express = require('express')
const cors = require('cors');
const morgan = require('morgan');
const connectToMongo = require('./db');
connectToMongo();   
 
  const app = express()
  const port = 5000 
  
  app.use(express.json());  
  app.use(morgan('dev'));

  const corsOptions = {
    origin:['https://ggnotebook.vercel.app'],
    Credential:true,
  }

  app.use(cors(corsOptions));
  
// Available Routes 
// app.use('/api/auth', require('./routes/auth'))
// app.use('/api/notes', require('./routes/notes')) 

app.get('/', (req, res) => {
  res.send('Welcome to the main API!');
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something broke!');
});

// app.listen(port, () => {
//   console.log(`ggNotebook Cloud Backend listening on port ${port}`)
// })

module.exports = app; 