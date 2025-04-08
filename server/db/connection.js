const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;
        if (!mongoURI) {
            throw new Error('MONGODB_URI is not defined in environment variables');
        }

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
        process.exit(1);
    }
};

module.exports = connectDB;




https://zithara-project-frontend-gko4bpxab-komals-projects-be9512a3.vercel.app/register