import { User } from "../model/user.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    console.log(req.body);
    const { firstname, lastname, email, password } = req.body;
    if (!firstname || !lastname || !email || !password) {
      return res.json({ success: false, message: "all fields are required" });
    }
    const isExist = await User.findOne({ email });
    if (isExist) {
      return res.json({
        status: 409,
        success: false,
        message: "email already registered",
      });
    }
    console.log(isExist);
    const hashPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      firstname,
      lastname,
      email,
      password: hashPassword,
    });
    console.log(user);

    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });

    return res.json({
      status: 201,
      success: true,
      message: "user registered successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      success: false,
      message: "error in registration",
    });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.json({
        status: 400,
        success: false,
        message: "all fields required",
      });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        status: 401,
        success: false,
        message: "invalid credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        status: 401,
        success: false,
        message: "invalid password",
      });
    }
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET, {
      expiresIn: "7d",
    });
    return res.json({
      status: 200,
      success: true,
      message: "user login successfully",
      user,
      token,
    });
  } catch (error) {
    console.log(error);
    return res.json({
      status: 500,
      success: false,
      message: "error in login",
    });
  }
};
