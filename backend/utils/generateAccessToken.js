import jwt from "jsonwebtoken";
import { jwtConfig } from "../config/jwt.js";

const generateAccessToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    jwtConfig.accessToken.secret,
    {
      expiresIn: jwtConfig.accessToken.expiresIn,
    }
  );
};

export default generateAccessToken;