import ApiError from "../utils/ApiError.js";

const validate = (schema) => {
  return (req, res, next) => {
    try {
      const parsedData = schema.parse(req.body);
      req.body = parsedData; // replace with validated & sanitized data
      next();
    } catch (error) {
      throw new ApiError(
        400,
        error.errors?.[0]?.message || "Invalid request data"
      );
    }
  };
};

export default validate;
