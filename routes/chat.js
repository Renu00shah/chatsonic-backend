import express from "express";
import { create, get, getSingle, remove, update } from "../controllers/chat.js";
import { decodeToken } from "../middleware/decodeToken.js";
const chatRoute = express.Router();
chatRoute.post("/create", decodeToken, create);
chatRoute.get("/get", get);
chatRoute.get("/single", decodeToken, getSingle);
chatRoute.put("/update/:id", update);
chatRoute.delete("/remove/:id", remove);

export default chatRoute;
