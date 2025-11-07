import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

export default async function connectToDB() {
  try {
    if (!process.env.MONGODB_URI) {
      return console.log("MONGODB_URI is not defined in environment variables");
    }
    const connection = await mongoose.connect(process.env.MONGODB_URI);
    connection.on("connected", () => {
      console.log("MongoDB connection established successfully");
    });
    connection.on("error", (err) => {
      console.log("MongoDB connection error:", err);
    });
  } catch (error) {
    console.log("connection failed:", error.message);
  }
}
