// lib/mongo.js
import mongoose from 'mongoose';

const MONGODB_URL = 'mongodb://localhost:27017/backend';

const connectMongoDB = async () => {
  if (mongoose.connections[0].readyState) {
    return; // Ya está conectado
  }

  try {
    await mongoose.connect(MONGODB_URL);
    console.log('Conectado a MongoDB');
  } catch (error) {
    console.error('Error conectando a MongoDB:', error);
    throw new Error('Error conectando a MongoDB');
  }
};

export default connectMongoDB;
