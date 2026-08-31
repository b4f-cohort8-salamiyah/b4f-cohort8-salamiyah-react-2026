import Category from "../models/Category.js";
import MenuItem from "../models/MenuItem.js";
import { sendSuccess, sendError } from "../utils/apiResponse.js";

export const getCategories = async (req, res) => {
  try {
    const categories = await Category.find().sort({
      sortOrder: 1,
      createdAt: 1,
    });
    return sendSuccess(res, categories, 200, "Categories fetched successfully");
  } catch (error) {
    return sendError(res, "Failed to fetch categories", 500);
  }
};

export const createCategory = async (req, res) => {
  try {
    const { name, description, image, isActive, sortOrder } = req.body;

    if (!name || !name.trim()) {
      return sendError(res, "Category name is required", 400);
    }

    const category = await Category.create({
      name: name.trim(),
      description: description || "",
      image: image || "",
      isActive: isActive !== false,
      sortOrder: sortOrder || 0,
    });

    return sendSuccess(res, category, 201, "Category created successfully");
  } catch (error) {
    return sendError(res, "Failed to create category", 400);
  }
};

export const getMenu = async (req, res) => {
  try {
    const items = await MenuItem.find()
      .populate("category", "name")
      .sort({ sortOrder: 1, createdAt: 1 });

    return sendSuccess(res, items, 200, "Menu items fetched successfully");
  } catch (error) {
    return sendError(res, "Failed to fetch menu", 500);
  }
};

export const getMenuById = async (req, res) => {
  try {
    const item = await MenuItem.findById(req.params.id).populate(
      "category",
      "name",
    );

    if (!item) {
      return sendError(res, "Menu item not found", 404);
    }

    return sendSuccess(res, item, 200, "Menu item fetched successfully");
  } catch (error) {
    return sendError(res, "Failed to fetch menu item", 500);
  }
};

export const createMenuItem = async (req, res) => {
  try {
    const {
      name,
      description,
      price,
      image,
      category,
      ingredients,
      available,
      featured,
      sortOrder,
    } = req.body;

    if (!name || !description || !category || price === undefined) {
      return sendError(
        res,
        "Name, description, category and price are required",
        400,
      );
    }

    const item = await MenuItem.create({
      name,
      description,
      price: Number(price),
      image: image || "",
      category,
      ingredients: ingredients || [],
      available: available !== false,
      featured: !!featured,
      sortOrder: sortOrder || 0,
    });

    return sendSuccess(res, item, 201, "Menu item created successfully");
  } catch (error) {
    return sendError(res, "Failed to create menu item", 400);
  }
};

export const updateMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!item) {
      return sendError(res, "Menu item not found", 404);
    }

    return sendSuccess(res, item, 200, "Menu item updated successfully");
  } catch (error) {
    return sendError(res, "Failed to update menu item", 400);
  }
};

export const deleteMenuItem = async (req, res) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);

    if (!item) {
      return sendError(res, "Menu item not found", 404);
    }

    return sendSuccess(res, null, 200, "Menu item deleted successfully");
  } catch (error) {
    return sendError(res, "Failed to delete menu item", 500);
  }
};
