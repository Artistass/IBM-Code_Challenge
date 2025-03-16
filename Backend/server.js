import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import router from "./Routes/userActionRouter.js";

dotenv.config();
const { PORT, MONGO_URI } = process.env;

mongoose
  .connect(MONGO_URI, { dbName: "WeatherApp" })
  .then(() => console.log("Connected to DB"))
  .catch(() => console.log("Failed to connect"));

const app = express();

app.use(cors());
app.use(express.json());
app.use(router);

app.listen(PORT, () => {
  console.log(`Backend server running on PORT ${PORT}`);
});
