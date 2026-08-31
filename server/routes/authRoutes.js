import express from "express";
import { login, getCurrentUser } from "../controllers/authController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.get("/me", protect, getCurrentUser);

export default router;
