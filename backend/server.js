import { app } from "./app.js";

import dotenv from "dotenv";
import { connectDatabase } from "./database.js";
dotenv.config({ path: "./config.env" });

connectDatabase(); // This function connects the database

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
