import express from "express";
import { create, get } from "../controllers/message.js";
import { decodeToken } from "../middleware/decodeToken.js";
const messageRoute = express.Router();
messageRoute.post("/create/:chatId", create);
messageRoute.get("/get/:chatId", get);

export default messageRoute;
