import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import Category from "./models/Category.js";
import MenuItem from "./models/MenuItem.js";
import User from "./models/User.js";

dotenv.config();

const seedData = async () => {
  await connectDB();

  try {
    await User.deleteMany({});
    await Category.deleteMany({});
    await MenuItem.deleteMany({});

    const adminPassword = await bcrypt.hash("admin123", 10);

    const admin = await User.create({
      name: "Odessye Admin",
      email: "admin@odessye.com",
      passwordHash: adminPassword,
      role: "admin",
    });

    const categories = await Category.insertMany([
      {
        name: "Burgers",
        description: "Classic burgers and grilled favorites",
        image: "",
        isActive: true,
        sortOrder: 1,
      },
      {
        name: "Pizza",
        description: "Fresh oven baked pizzas",
        image: "",
        isActive: true,
        sortOrder: 2,
      },
      {
        name: "Pasta",
        description: "Creamy and savory pasta dishes",
        image: "",
        isActive: true,
        sortOrder: 3,
      },
      {
        name: "Desserts",
        description: "Sweet treats to finish your meal",
        image: "",
        isActive: true,
        sortOrder: 4,
      },
      {
        name: "Drinks",
        description: "Cold and hot drinks",
        image: "",
        isActive: true,
        sortOrder: 5,
      },
    ]);

    const burgerCategory = categories.find((cat) => cat.name === "Burgers");
    const pizzaCategory = categories.find((cat) => cat.name === "Pizza");
    const pastaCategory = categories.find((cat) => cat.name === "Pasta");
    const dessertCategory = categories.find((cat) => cat.name === "Desserts");
    const drinksCategory = categories.find((cat) => cat.name === "Drinks");

    await MenuItem.insertMany([
      {
        name: "Crispy Chicken Basket",
        description: "Crispy chicken pieces, fries, and fresh sauce.",
        price: 18,
        image:
          "https://images.unsplash.com/photo-1562967916-eb82221dfb92?auto=format&fit=crop&w=900&q=80",
        category: burgerCategory._id,
        ingredients: ["Chicken", "Fries", "Sauce"],
        available: true,
        featured: true,
        sortOrder: 1,
      },
      {
        name: "Royal Burger Deluxe",
        description: "Beef patty, cheddar, lettuce, tomato, and onion.",
        price: 22,
        image:
          "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=900&q=80",
        category: burgerCategory._id,
        ingredients: ["Beef", "Cheddar", "Lettuce", "Tomato"],
        available: true,
        featured: true,
        sortOrder: 2,
      },
      {
        name: "Margherita Pizza",
        description: "Classic pizza with mozzarella and basil.",
        price: 19,
        image:
          "https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=900&q=80",
        category: pizzaCategory._id,
        ingredients: ["Mozzarella", "Tomato", "Basil"],
        available: true,
        featured: true,
        sortOrder: 3,
      },
      {
        name: "Truffle Pasta",
        description: "Creamy sauce with parmesan and mushrooms.",
        price: 24,
        image:
          "https://images.unsplash.com/photo-1555949258-eb67b1ef0ceb?auto=format&fit=crop&w=900&q=80",
        category: pastaCategory._id,
        ingredients: ["Pasta", "Mushrooms", "Parmesan"],
        available: true,
        featured: false,
        sortOrder: 4,
      },
      {
        name: "Chocolate Lava",
        description: "Warm chocolate cake with molten center.",
        price: 12,
        image:
          "https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=900&q=80",
        category: dessertCategory._id,
        ingredients: ["Chocolate", "Cocoa", "Cream"],
        available: true,
        featured: false,
        sortOrder: 5,
      },
      {
        name: "Iced Latte",
        description: "Smooth espresso with chilled milk and foam.",
        price: 8,
        image:
          "https://images.unsplash.com/photo-1509042239860-f550ce710b93?auto=format&fit=crop&w=900&q=80",
        category: drinksCategory._id,
        ingredients: ["Espresso", "Milk", "Ice"],
        available: true,
        featured: false,
        sortOrder: 6,
      },
    ]);

    console.log("Seed data created successfully");
    console.log("Admin email: admin@odessye.com");
    console.log("Admin password: admin123");

    process.exit(0);
  } catch (error) {
    console.error("Seed failed:", error.message);
    process.exit(1);
  }
};

seedData();
