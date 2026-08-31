import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || "odessye-secret-key", {
    expiresIn: "7d",
  });
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return sendError(res, "Email and password are required", 400);
    }

    const user = await User.findOne({ email: email.toLowerCase() });

    if (!user) {
      return sendError(res, "Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);

    if (!isMatch) {
      return sendError(res, "Invalid credentials", 401);
    }

    const token = generateToken(user._id);

    return sendSuccess(
      res,
      {
        token,
        user: {
          id: user._id,
          name: user.name,
          email: user.email,
          role: user.role,
        },
      },
      200,
      "Login successful",
    );
  } catch (error) {
    return sendError(res, "Login failed", 500);
  }
};

export const getCurrentUser = async (req, res) => {
  try {
    return sendSuccess(
      res,
      {
        id: req.user._id,
        name: req.user.name,
        email: req.user.email,
        role: req.user.role,
      },
      200,
      "User fetched successfully",
    );
  } catch (error) {
    return sendError(res, "Failed to fetch user", 500);
  }
};
