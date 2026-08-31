import Order from "../models/Order.js";
import MenuItem from "../models/MenuItem.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

export const getOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("user", "name email role")
      .populate("items.menuItem", "name image")
      .sort({ createdAt: -1 });

    return sendSuccess(res, orders, 200, "Orders fetched successfully");
  } catch (error) {
    return sendError(res, "Failed to fetch orders", 500);
  }
};

export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate("user", "name email role")
      .populate("items.menuItem", "name image");

    if (!order) {
      return sendError(res, "Order not found", 404);
    }

    return sendSuccess(res, order, 200, "Order fetched successfully");
  } catch (error) {
    return sendError(res, "Failed to fetch order", 500);
  }
};

export const createOrder = async (req, res) => {
  try {
    const { customerInfo, items, orderType, address, notes } = req.body;

    if (!Array.isArray(items) || items.length === 0) {
      return sendError(res, "Order must contain at least one item", 400);
    }

    const preparedItems = [];
    let subtotal = 0;

    for (const item of items) {
      const menuItem = await MenuItem.findById(item.menuItem);

      if (!menuItem || !menuItem.available) {
        return sendError(res, `Item not available: ${item.menuItem}`, 400);
      }

      const quantity = Number(item.quantity || 1);
      const priceAtPurchase = Number(menuItem.price);
      const itemTotal = priceAtPurchase * quantity;

      subtotal += itemTotal;

      preparedItems.push({
        menuItem: menuItem._id,
        name: menuItem.name,
        quantity,
        priceAtPurchase,
      });
    }

    const deliveryFee = orderType === "delivery" ? 5 : 0;
    const total = subtotal + deliveryFee;

    const order = await Order.create({
      user: req.user ? req.user._id : null,
      customerInfo: customerInfo || {},
      items: preparedItems,
      subtotal,
      discount: 0,
      deliveryFee,
      total,
      orderType: orderType || "takeaway",
      address: address || "",
      notes: notes || "",
      status: "pending",
      paymentStatus: "unpaid",
    });

    return sendSuccess(res, order, 201, "Order created successfully");
  } catch (error) {
    return sendError(res, "Failed to create order", 500);
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const order = await Order.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true },
    );

    if (!order) {
      return sendError(res, "Order not found", 404);
    }

    return sendSuccess(res, order, 200, "Order status updated successfully");
  } catch (error) {
    return sendError(res, "Failed to update order status", 500);
  }
};
