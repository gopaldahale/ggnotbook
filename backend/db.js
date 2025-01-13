const mongoose = require('mongoose');
// const mongURI = "mongodb://localhost:27017/ggnotebook";
const mongURI = "mongodb+srv://gdahale66:gdahale66@cluster0.ga5qx.mongodb.net/ggnotebook?retryWrites=true&w=majority&appName=Cluster0";

const connectToMongo = async () => {
    // await mongoose.connect("mongodb://localhost:27017/ggnotebook",{});
    await mongoose.connect("mongodb+srv://gdahale66:gdahale66@cluster0.ga5qx.mongodb.net/ggnotebook?retryWrites=true&w=majority&appName=Cluster0",{});
    
    console.log('Connected to Mongo Successfully');
}

module.exports = connectToMongo; 

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

