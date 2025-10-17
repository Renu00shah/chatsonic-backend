import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;

app.use("/auth", userRoute);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
