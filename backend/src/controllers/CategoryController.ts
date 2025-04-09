import { Request, Response } from "express";
import Category from "../models/Category";



export const createCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name } = req.body;
    const image = req.file ? `/uploads/${req.file.filename}` : "";

    if (!name || !image) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // 👉 Check for duplicate category name (case insensitive)
    const existing = await Category.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    if (existing) {
      res.status(409).json({ message: "Category with this name already exists" });
      return;
    }

    const newCategory = new Category({ name, image });
    await newCategory.save();

    res.status(201).json({ message: "Category created successfully", category: newCategory });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};


export const getCategories = async (_req: Request, res: Response): Promise<void> => {
  try {
    const categories = await Category.find();
    res.json(categories);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getCategoryById = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id);

    if (!category) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    res.json(category);
  } catch (error) {
    res.status(500).json({ message: "Error fetching category" });
  }
};

export const updateCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    const { id } = req.params;
    const { name } = req.body;
    let image = req.file?.path;

    const existingCategory = await Category.findById(id);
    if (!existingCategory) {
      res.status(404).json({ message: "Category not found" });
      return;
    }

    // 👉 Check for duplicate category name, excluding current category
    const duplicate = await Category.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, "i") }, 
      _id: { $ne: id }
    });

    if (duplicate) {
      res.status(409).json({ message: "Category with this name already exists" });
      return;
    }

    existingCategory.name = name;
    if (image) existingCategory.image = image;

    await existingCategory.save();
    res.json({ message: "Category updated successfully", category: existingCategory });
  } catch (error) {
    res.status(500).json({ message: "Error updating category" });
  }
};


export const deleteCategory = async (req: Request, res: Response): Promise<void> => {
  try {
    await Category.findByIdAndDelete(req.params.id);
    res.json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
