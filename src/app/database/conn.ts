import mongoose from "mongoose";

const connectDb = async () => {
  console.log('Connection function called');
  console.log('Current connection state:', mongoose.connection.readyState);
  
  const connectionStates = ['disconnected', 'connected', 'connecting', 'disconnecting'];
  console.log('Connection status:', connectionStates[mongoose.connection.readyState] || 'unknown');
  
  mongoose.set('strictQuery', true);

  if (mongoose.connection.readyState >= 1) {
    console.log('MongoDB: Reusing existing connection');
    return mongoose.connection; // Return the existing connection
  }

  if (!process.env.MONGO_URL) {
    console.error('MONGO_URL environment variable is not defined!');
    throw new Error('MongoDB connection string is missing');
  }

  try {
    console.log('MongoDB: Attempting to connect...');
    await mongoose.connect(process.env.MONGO_URL as string);
    console.log('MongoDB: Connection successful');

    if (!mongoose.connection.listeners('connected').length) {
      mongoose.connection.on('connected', () => {
        console.log('MongoDB event: Connected');
      });
    }

    if (!mongoose.connection.listeners('error').length) {
      mongoose.connection.on('error', (err:any) => {
        console.error('MongoDB event: Connection error:', err);
      });
    }

    if (!mongoose.connection.listeners('disconnected').length) {
      mongoose.connection.on('disconnected', () => {
        console.log('MongoDB event: Disconnected');
      });
    }

    return mongoose.connection; 
  } catch (error) {
    console.error('Error connecting to MongoDB:', error);
    throw error; 
  }
};

export default connectDb;
