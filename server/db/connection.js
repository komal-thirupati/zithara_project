const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        // Use environment variable or fallback to MongoDB Atlas connection string
        const mongoURI = process.env.MONGODB_URI || 'mongodb+srv://admin:admin@cluster0.vr23ljt.mongodb.net/jewellery_app?retryWrites=true&w=majority';
        
        console.log('Attempting to connect to MongoDB with URI:', mongoURI);

        const options = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            socketTimeoutMS: 45000,
        };

        await mongoose.connect(mongoURI, options);
        
        const db = mongoose.connection;
        
        db.on('error', (error) => {
            console.error('MongoDB connection error:', error);
        });
        
        db.once('open', () => {
            console.log('MongoDB connected successfully');
        });

        // Handle connection events
        db.on('disconnected', () => {
            console.log('MongoDB disconnected');
        });

        db.on('reconnected', () => {
            console.log('MongoDB reconnected');
        });

    } catch (err) {
        console.error('Error connecting to MongoDB:', err.message);
        console.error('Full error:', err);
        process.exit(1);
    }
};

module.exports = connectDB; 