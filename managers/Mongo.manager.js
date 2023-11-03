import moongoose from "mongoose";
import dotenv from "dotenv";

export const MongoDB = () => {
  const connect = async () => {
    try {
      dotenv.config();
      const url = process.env.DATABASE_URL;

      const database = await moongoose.connect(url);

      if (database.connection.readyState) {
        console.log("Connected to database (MongoDB)");
      }
    } catch (error) {
      console.error("Error connecting to MongoDB:", error);
    }
  };

  return { connect };
};
