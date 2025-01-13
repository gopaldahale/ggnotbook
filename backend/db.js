require('dotenv').config();
const mongoose = require('mongoose');
 

console.log('MongoDB URI from env:', process.env.DB_URI);  // Add this log

const DB_URI = process.env.DB_URI;

const connectToMongo = async () => {
    if (!DB_URI) {
        console.error('No DB_URI found in environment variables!');
        return;
    }

    try {
        await mongoose.connect(DB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('Connected to MongoDB Successfully');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
        process.exit(1);  // Exit the process on failure
    }
};

module.exports = connectToMongo;


{/* <script> require('dotenv').config({ path: '/.env' });


const mongoose = require('mongoose');

const DB_URI = process.env.DB_URI;
// const mongURI = "mongodb://localhost:27017/ggnotebook";
// const mongURI = "mongodb+srv://gdahale66:gdahale66@cluster0.ga5qx.mongodb.net/ggnotebook?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    await mongoose.connect(DB_URI,{  useNewUrlParser: true, useUnifiedTopology: true });
    // await mongoose.connect("mongodb://localhost:27017/ggnotebook",{});
    // await mongoose.connect("mongodb+srv://gdahale66:gdahale66@cluster0.ga5qx.mongodb.net/ggnotebook?retryWrites=true&w=majority&appName=Cluster0", {});

    console.log('Connected to Mongo Successfully');
    console.log('MongoDB URI from env:', process.env.DB_URI);  // This should log the correct URI

}

module.exports = connectToMongo;


</script> */}

// const mongoose = require('mongoose');

// const connectToMongo = async () => {
//   try {
//     await mongoose.connect('mongodb://localhost:27017', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log('Connected to MongoDB successfully!');
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//   }
// };

// module.exports = connectToMongo;

