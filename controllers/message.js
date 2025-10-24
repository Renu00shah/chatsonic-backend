import { Chat } from "../model/chat.js";
import { Message } from "../model/message.js";
import openai from "../server.js";

export const create = async (req, res) => {
  try {
    const { chatId } = req.params;
    console.log(chatId);
    const { content } = req.body;
    console.log(content);
    if (!content) {
      return res.json({
        status: 401,
        success: false,
        message: "content is required",
      });
    }
    const userMessage = await Message.create({ chatId, content });
    const chat = await Chat.findById(chatId);
    console.log(chat);

    const messageCount = await Message.countDocuments({ chatId });
    if (messageCount === 1) {
      chat.title = content;
      await chat.save();
    }

    let aiResponse;
    if (/image|photo|picture|draw/i.test(content)) {
      const imageResponse = await openai.images.generate({
        model: "gpt-image-1",
        prompt: content,
        size: "1024x1024",
      });
      aiResponse = imageResponse.data[0].url;
    } else {
      const completion = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        messages: [{ role: "user", content }],
      });

      aiResponse = completion.choices[0].message.content;
    }

    await Message.create({ chatId, content: aiResponse, role: "assistant" });

    return res.json({
      status: 201,
      success: true,
      message: "message created successfully",
      userMessage,
      aiResponse,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 500,
      success: false,
      message: "message creation error",
      error: error.message,
    });
  }
};

export const update = (req, res) => {
  try {
  } catch (error) {}
};

export const get = async (req, res) => {
  try {
    const { chatId } = req.params;
    console.log(chatId);
    const messages = await Message.find({ chatId });
    console.log(messages);
    return res.json({
      status: 200,
      success: true,
      message: "message fetched",
      messages,
    });
  } catch (error) {
    console.error(error);
    return res.json({
      status: 500,
      success: false,
      message: "error in getting messages",
      error: error.message,
    });
  }
};
