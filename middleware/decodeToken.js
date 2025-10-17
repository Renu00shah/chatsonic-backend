import jwt from "jsonwebtoken";

export const decodeToken = (req, res, next) => {
  try {
    // const { token } = req.headers;
    // console.log("REQ:", req.headers);
    const token = req.headers.authorization?.split(" ")[1];

    // console.log(token);
    if (!token) {
      return res.json({
        status: 401,
        success: false,
        message: "token missing",
      });
    }
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = decodedToken;
    // console.log("DECODED_TOKEN:", decodedToken);
  } catch (error) {
    console.log(error);
    return res.json({
      status: 403,
      success: false,
      message: "invalid token or expired",
    });
  }
  next();
};
