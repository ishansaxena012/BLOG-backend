import ApiError from "../utils/ApiError.js";

export const errorMiddleware = (err, req, res, next) => {
  let statusCode = 500;
  let message = "Internal Server Error";

  if (err instanceof ApiError) {
    statusCode = err.statusCode;
    message = err.message;
  }

  res.status(statusCode).json({
    success: false,
    message
  });
};
