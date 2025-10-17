import mongoose from "mongoose";
const chatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    title: { type: String, required: true, default: "New Chat" },
  },
  { timestamps: true }
);
export const Chat = new mongoose.model("Chat", chatSchema);
