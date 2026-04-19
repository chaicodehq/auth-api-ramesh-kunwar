import mongoose from "mongoose";

/**
 * TODO: Connect to MongoDB
 *
 * 1. Check if uri is provided (throw error if not: "MongoDB URI is required")
 * 2. Connect using mongoose.connect(uri)
 * 3. Return mongoose.connection
 */
export async function connectDB(uri) {
  // Your code here
  try {
    const conn = await mongoose.connect(uri);
    console.log("MongoDB Connected Successfully");
    return conn;
  } catch (error) {
    console.log("DB Connection failed: " + error);
  }
}
