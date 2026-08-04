import ApiError from "../utils/ApiError.js";

const errorMiddleware = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  const statusCode =
    err instanceof ApiError ? err.statusCode : 500;

  const message =
    err instanceof ApiError
      ? err.message
      : "Internal Server Error";

  // Development logging
  if (process.env.NODE_ENV !== "production") {
    console.error("\n========== ERROR ==========");
    console.error(`${req.method} ${req.originalUrl}`);
    console.error(err.stack || err);
    console.error("===========================\n");
  }

  res.status(statusCode).json({
    success: false,
    message,
    errors: err.errors || [],
    ...(process.env.NODE_ENV !== "production" && {
      stack: err.stack,
    }),
  });
};

export default errorMiddleware;