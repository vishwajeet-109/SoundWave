import ApiError from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode = err instanceof ApiError ? err.statusCode : 500;
  const message = err instanceof ApiError ? err.message : "Internal server error";

  res.status(statusCode).json({
    success: false,
    message,
    errors: err?.errors || [],
  });
};

export default errorMiddleware;