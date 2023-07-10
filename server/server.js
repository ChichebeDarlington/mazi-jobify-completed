import "express-async-errors";
import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import notFoundMiddleawre from "./middlewares/not-found.js";
import errorHandlerMiddleware from "./middlewares/error-handler.js";
import { connectDB } from "./database/connectDB.js";
import authRoute from "./routes/authRoutes.js";
import jobsRoute from "./routes/jobsRoute.js";
import authenticateUser from "./middlewares/auth.js";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  throw new Error("error occurrence");
  res.status(200).json({ msg: "Hello world" });
});

// routes
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/jobs", authenticateUser, jobsRoute);

// middleware
app.use(notFoundMiddleawre);
app.use(errorHandlerMiddleware);

const port = process.env.PORT || 7000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, () => {
      console.log(`app listening @ port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
