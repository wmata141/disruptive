import mongoose from 'mongoose';
import config from './config.js';

const connectDB = async () => {
  try {
    // Create connection to MongoDB using configuration URI
    const connection = await mongoose.connect(config.MONGO_URL)

    // 'connected' event handler to indicate successful connection to MongoDB
    connection.connection.on('connected', () => {
      console.log('Successful connection to MongoDB');
    });

    // 'error' event handler to catch errors on connection to MongoDB
    connection.connection.on('error', (error) => {
      console.error(`Error connecting to MongoDB: ${error.message}`);
    });

    // 'disconnected' event handler to indicate disconnection from MongoDB
    connection.connection.on('disconnected', () => {
      console.log('Disconnecting from MongoDB');
    });

    // 'reconnected' event handler to indicate reconnection to MongoDB
    connection.connection.on('reconnected', () => {
      console.log('Successful reconnection to MongoDB');
    });

  } catch (error) {
    console.error(`Error connecting to MongoDB: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB; 
