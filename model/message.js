import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    content: { type: String, required: true },
    role: { type: String, enum: ["user", "assistant"], default: "user" },
  },
  { timestamps: true }
);
export const Message = mongoose.model("Message", messageSchema);
