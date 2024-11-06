const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try{
        await mongoose.connect(process.env.MOMGODB.URI,{ useNewUPaRLParser: true, useUnifiedTopology: true });
        console.log('MongoDB connected')
    }catch{
        console.error('MongoDB connection error:', error);
        process.exit(1);
    };

    module.exports = connectDB;
}