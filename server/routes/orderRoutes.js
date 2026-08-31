import express from "express";
import {
  createOrder,
  getOrderById,
  getOrders,
  updateOrderStatus,
} from "../controllers/orderController.js";
import { adminOnly, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protect, adminOnly, getOrders);
router.get("/:id", protect, adminOnly, getOrderById);
router.post("/", createOrder);
router.patch("/:id/status", protect, adminOnly, updateOrderStatus);

export default router;
