import express from "express";
import { create, get } from "../controllers/message.js";
const messageRoute = express.Router();
messageRoute.post("/create/:id", create);
messageRoute.get("/get/:chatId", get);

export default messageRoute;
