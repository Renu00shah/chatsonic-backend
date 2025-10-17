import mongoose from "mongoose";
const messageSchema = new mongoose.Schema(
  {
    chatId: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
    content: { type: String, required: true },
    role: { type: String, enum: ["user", "assistant"] },
  },
  { timestamps: true }
);
export const Message = new mongoose.model("Message", messageSchema);
