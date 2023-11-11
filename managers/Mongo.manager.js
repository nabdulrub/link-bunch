import dotenv from "dotenv";
import mongoose from "mongoose";

export const MongoDB = () => {
  const connect = async () => {
    try {
      dotenv.config();
      const url = process.env.DATABASE_URL;

      const database = await mongoose.connect(url);
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
      throw error; // Throw the error for handling externally
    }
  };

  return { connect };
};
