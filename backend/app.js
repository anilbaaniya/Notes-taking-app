import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { noteRoute } from "./routes/noteRoutes.js";
import { userRoute } from "./routes/userRoutes.js";

export const app = express();

app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// test middleware
app.use((req, res, next) => {
  //   console.log(req.headers);
  next();
});

app.use("/api/v1/notes", noteRoute);
app.use("/api/v1/users", userRoute);
