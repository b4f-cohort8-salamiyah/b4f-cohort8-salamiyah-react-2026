import express from "express";
import {
  createCategory,
  createMenuItem,
  deleteMenuItem,
  getCategories,
  getMenu,
  getMenuById,
  updateMenuItem,
} from "../controllers/menuController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/categories", getCategories);
router.post("/categories", protect, adminOnly, createCategory);

router.get("/menu", getMenu);
router.get("/menu/:id", getMenuById);
router.post("/menu", protect, adminOnly, createMenuItem);
router.patch("/menu/:id", protect, adminOnly, updateMenuItem);
router.delete("/menu/:id", protect, adminOnly, deleteMenuItem);

export default router;
