import ApiError from "../utils/ApiError.js";

const roleMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ApiError(401, "Authentication required"));
    }

    if (!Array.isArray(allowedRoles) || allowedRoles.length === 0) {
      return next(new ApiError(500, "Role configuration error"));
    }

    if (!allowedRoles.includes(req.user.role)) {
      return next(new ApiError(403, "Access denied"));
    }

    next();
  };
};

export default roleMiddleware;