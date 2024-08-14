import mongoose from 'mongoose';


const MONGO_URL = 'mongodb://localhost:27017/backend';

export const connectMongoDB = async () => {

    try {
        await mongoose.connect(MONGO_URL);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.log('Error connecting to MongoDB: ', error);
    }


};