import express from "express";
import { login, register } from "../controllers/user.js";
const userRoute = express.Router();
userRoute.post("/register", register);
userRoute.post("/login", login);

export default userRoute;
