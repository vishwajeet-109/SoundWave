import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

const generateRefreshToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
    },
    jwtConfig.refreshToken.secret,
    {
      expiresIn: jwtConfig.refreshToken.expiresIn,
    }
  );
};

export default generateRefreshToken;