import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.resolve(__dirname, "config.env") });

const DB = process.env.DATABASE.replace(
  "<password>",
  process.env.DATABASE_PASSWORD,
);

export const connectDatabase = async () => {
  try {
    await mongoose.connect(DB);
    console.log("Database connected successfully!");
  } catch (error) {
    console.log(error);
  }
};
