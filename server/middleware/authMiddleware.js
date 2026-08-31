import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { sendError } from "../utils/apiResponse.js";

export const protect = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return sendError(res, "Not authorized, token missing", 401);
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "odessye-secret-key",
    );

    const user = await User.findById(decoded.id).select("-passwordHash");

    if (!user) {
      return sendError(res, "User not found", 401);
    }

    req.user = user;
    next();
  } catch (error) {
    return sendError(res, "Not authorized, invalid token", 401);
  }
};

export const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== "admin") {
    return sendError(res, "Admin access required", 403);
  }

  next();
};
