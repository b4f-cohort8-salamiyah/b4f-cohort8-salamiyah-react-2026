import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import menuRoutes from "./routes/menuRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import { sendError } from "./utils/apiResponse.js";

dotenv.config();

const fallbackCategories = [
  {
    _id: "cat-1",
    name: "Burgers",
    description: "Classic burgers and grilled favorites",
    isActive: true,
    sortOrder: 1,
  },
  {
    _id: "cat-2",
    name: "Pizza",
    description: "Fresh oven baked pizzas",
    isActive: true,
    sortOrder: 2,
  },
  {
    _id: "cat-3",
    name: "Pasta",
    description: "Creamy and savory pasta dishes",
    isActive: true,
    sortOrder: 3,
  },
  {
    _id: "cat-4",
    name: "Desserts",
    description: "Sweet treats to finish your meal",
    isActive: true,
    sortOrder: 4,
  },
  {
    _id: "cat-5",
    name: "Drinks",
    description: "Cold and hot drinks",
    isActive: true,
    sortOrder: 5,
  },
];

const fallbackMenu = [
  {
    _id: "item-1",
    name: "Crispy Chicken Basket",
    description: "Crispy chicken pieces, fries, and fresh sauce.",
    price: 18,
    image:
      "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=80",
    category: { _id: "cat-1", name: "Burgers" },
    ingredients: ["Chicken", "Fries", "Sauce"],
    available: true,
    featured: true,
  },
  {
    _id: "item-2",
    name: "Royal Burger Deluxe",
    description: "Beef patty, cheddar, lettuce, tomato, and onion.",
    price: 22,
    image:
      "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
    category: { _id: "cat-1", name: "Burgers" },
    ingredients: ["Beef", "Cheddar", "Lettuce"],
    available: true,
    featured: true,
  },
  {
    _id: "item-3",
    name: "Margherita Pizza",
    description: "Classic pizza with mozzarella and basil.",
    price: 19,
    image:
      "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
    category: { _id: "cat-2", name: "Pizza" },
    ingredients: ["Mozzarella", "Tomato", "Basil"],
    available: true,
    featured: true,
  },
  {
    _id: "item-4",
    name: "Truffle Pasta",
    description: "Creamy sauce with parmesan and mushrooms.",
    price: 24,
    image:
      "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80",
    category: { _id: "cat-3", name: "Pasta" },
    ingredients: ["Pasta", "Mushrooms", "Parmesan"],
    available: true,
    featured: false,
  },
  {
    _id: "item-5",
    name: "Chocolate Lava",
    description: "Warm chocolate cake with molten center.",
    price: 12,
    image:
      "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80",
    category: { _id: "cat-4", name: "Desserts" },
    ingredients: ["Chocolate", "Cocoa"],
    available: true,
    featured: false,
  },
  {
    _id: "item-6",
    name: "Iced Latte",
    description: "Smooth espresso with chilled milk and foam.",
    price: 8,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
    category: { _id: "cat-5", name: "Drinks" },
    ingredients: ["Espresso", "Milk", "Ice"],
    available: true,
    featured: false,
  },
];

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    message: "Odessye API is running",
    name: "Odessye Cafe",
    database:
      mongoose.connection.readyState === 1 ? "connected" : "not connected",
  });
});

app.get("/api/categories", (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json({
      success: true,
      message: "Categories fetched successfully",
      data: fallbackCategories,
    });
  }

  return res.json({
    success: true,
    message: "Categories fetched successfully",
    data: fallbackCategories,
  });
});

app.get("/api/menu", (req, res) => {
  if (mongoose.connection.readyState !== 1) {
    return res.json({
      success: true,
      message: "Menu items fetched successfully",
      data: fallbackMenu,
    });
  }

  return res.json({
    success: true,
    message: "Menu items fetched successfully",
    data: fallbackMenu,
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/", menuRoutes);
app.use("/api/orders", orderRoutes);

app.use((req, res) => {
  sendError(res, "Route not found", 404);
});

app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  sendError(res, "Internal server error", 500);
});

connectDB();

app.listen(port, () => {
  console.log(`Odessye server running on http://localhost:${port}`);
});
