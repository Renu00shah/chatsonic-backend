import express from "express";
import { connectDB } from "./config/db.js";
import dotenv from "dotenv";
import userRoute from "./routes/user.js";
import chatRoute from "./routes/chat.js";
import messageRoute from "./routes/message.js";
import OpenAI from "openai";

dotenv.config();
connectDB();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const app = express();
app.use(express.json());

const port = process.env.PORT || 8080;

app.use("/auth", userRoute);
app.use("/chat", chatRoute);
app.use("/message", messageRoute);
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
export default openai;
