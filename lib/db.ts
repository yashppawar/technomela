import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/technomela';

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  );
}

// Global variable to maintain connection across hot reloads
let isConnected = false;

async function connectDB() {
  if (isConnected) {
    console.log('Using existing MongoDB connection');
    return;
  }

  try {
    console.log('Connecting to MongoDB:', MONGODB_URI.replace(/\/\/([^:]+):[^@]+@/, '//***:***@'));
    const connection = await mongoose.connect(MONGODB_URI);
    
    if (connection) {
      isConnected = true;
      console.log('MongoDB connected successfully!');
    }
  } catch (error: any) {
    console.error('MongoDB connection error:', error.message);
    console.error('Please make sure MongoDB is running and accessible at the configured URI');
    isConnected = false;
    throw error;
  }
}

// Add this to make sure mongoose doesn't throw deprecation warnings
mongoose.set('strictQuery', true);

export default connectDB; 