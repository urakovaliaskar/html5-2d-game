import jwt from "jsonwebtoken";
import User from "../models/User";

module.exports = (req, res, next) => {
  let token = req.headers["x-access-token"] || req.headers.authorization;

  if (token) {
    if (token.startsWith("Bearer ")) {
      token = token.slice(7, token.length);
    }
    jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
      if (err) {
        if (err.name == "TokenExpiredError") {
          return res.status(401).json({
            success: false,
            message: "Token is expired",
          });
        } else {
          return res.status(401).json({
            success: false,
            message: "Token is not valid",
          });
        }
      } else {
        try {
          const user = await User.query().findOne({ email: decoded.email });
          if (!user) {
            return res.status(401).json({
              success: false,
              message: "No user with such token exists",
            });
          } else {
            req.user = user;
            next();
          }
        } catch (error) {
          return res.status(401).json({
            success: false,
            message: "Failed to check token",
          });
        }
      }
    });
  } else {
    return res.status(401).json({
      success: false,
      message: "Auth token is not supplied",
    });
  }
};
