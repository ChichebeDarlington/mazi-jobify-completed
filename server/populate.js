import { readFile } from "fs/promises";

import dotenv from "dotenv";
dotenv.config();

import { connectDB } from "./database/connectDB.js";
import Job from "./models/jobsModel.js";

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await Job.deleteMany();
    const jsonProducts = JSON.parse(
      await readFile(new URL("../mock_data.json", import.meta.url))
    );
    await Job.create(jsonProducts);
    console.log("Successful");
    process.exit(0);
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};

start();
