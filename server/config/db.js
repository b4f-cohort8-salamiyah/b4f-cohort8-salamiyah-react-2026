import mongoose from "mongoose";

const connectDB = async () => {
  const mongoUri = process.env.MONGO_URI;

  if (!mongoUri) {
    console.log("MONGO_URI not defined. Skipping database connection.");
    return false;
  }

  try {
    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 5000,
    });
    console.log("MongoDB connected successfully");
    return true;
  } catch (error) {
    console.error("MongoDB connection failed:", error.message);
    return false;
  }
};

export default connectDB;
