import mongoose from 'mongoose';

const connectDB = async (): Promise<void> => {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
        console.warn('MONGO_URI not set — skipping MongoDB connection');
        return;
    }

    try {
        await mongoose.connect(MONGO_URI, { dbName: 'main', });
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB connection error:', err);
        throw err;
    }
};

export default connectDB;
