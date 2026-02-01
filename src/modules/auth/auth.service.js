import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import User from "../user/user.model.js";
import ApiError from "../../utils/ApiError.js";

// Register a new user
export const registerUser = async (userData) => {
  const { email, username } = userData;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new ApiError(409, "Email already in use");
  }

  const existingUsername = await User.findOne({ username });
  if (existingUsername) {
    throw new ApiError(409, "Username already taken");
  }

  const user = await User.create(userData);

  return {
    id: user._id,
    name: user.name,
    username: user.username,
    email: user.email,
    createdAt: user.createdAt
  };
};

// Login user
export const loginUser = async (email, password) => {
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  const isPasswordValid = await bcrypt.compare(password, user.password);
  if (!isPasswordValid) {
    throw new ApiError(401, "Invalid email or password");
  }

  const token = jwt.sign(
    { userId: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "23h" }
  );

  return {
    token,
    user: {
      id: user._id,
      name: user.name,
      username: user.username,
      email: user.email
    }
  };
};
