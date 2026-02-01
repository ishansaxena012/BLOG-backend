import jwt from "jsonwebtoken";
import ApiError from "../utils/ApiError.js";

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new ApiError(401, "Authentication required");
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
      id: decoded.userId
    };

    next();
  } catch (error) {
    throw new ApiError(401, "Invalid or expired token");
  }
};

export default authMiddleware;
