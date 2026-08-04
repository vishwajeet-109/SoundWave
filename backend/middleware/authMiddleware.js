import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import { jwtConfig } from "../config/jwt.js";
import { USER_STATUS } from "../constants/status.js";

const authMiddleware = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new ApiError(401, "Authentication required");
    }

    const token = authHeader.split(" ")[1]?.trim();

    if (!token) {
      throw new ApiError(401, "Authentication token missing");
    }

    const decoded = jwt.verify(token, jwtConfig.accessToken.secret);

    if (!decoded || !decoded.id) {
      throw new ApiError(401, "Invalid token");
    }

    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      throw new ApiError(401, "User not found");
    }

    if (user.status !== USER_STATUS.ACTIVE) {
      throw new ApiError(403, "User account is not active");
    }

    req.user = user;
    next();
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      return next(new ApiError(401, "Token expired"));
    }

    if (error instanceof jwt.JsonWebTokenError) {
      return next(new ApiError(401, "Invalid token"));
    }

    next(error);
  }
};

export default authMiddleware;