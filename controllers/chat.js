import { Chat } from "../model/chat.js";

export const create = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const chat = await Chat.create({ userId });
    return res.json({
      status: 201,
      success: true,
      message: "chat created",
      chat,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 500,
      success: false,
      message: "chat creation error",
      error: error.message,
    });
  }
};

export const get = async (req, res) => {
  try {
    const chat = await Chat.find();
    console.log(chat);
    return res.json({
      status: 200,
      success: true,
      message: "all chat found",
      chat,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 500,
      success: false,
      message: " error in getting chats",
      error: error.message,
    });
  }
};

export const getSingle = async (req, res) => {
  try {
    const userId = req.user._id;
    console.log(userId);
    const chat = await Chat.findOne({ userId });
    return res.json({
      status: 200,
      success: true,
      message: " get single chat",
      chat,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 500,
      success: false,
      message: " error in getting single chat",
      error: error.message,
    });
  }
};

export const update = async (req, res) => {
  try {
    const { title } = req.body;
    const { id } = req.params;
    console.log(id);
    const chat = await Chat.findByIdAndUpdate(id, { title }, { new: true });
    if (!chat) {
      return res.json({ success: false, message: "chat not found" });
    }
    return res.json({
      status: 200,
      success: true,
      message: "chat Updated",
      chat,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 500,
      success: false,
      message: "error in updation",
      error: error.message,
    });
  }
};

export const remove = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(id);
    await Chat.findByIdAndDelete(id);
    return res.json({
      status: 200,
      success: true,
      message: "chat deleted",
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 500,
      success: false,
      message: "error in deletion",
      error: error.message,
    });
  }
};
