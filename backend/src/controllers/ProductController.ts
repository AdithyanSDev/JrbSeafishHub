import { Request, Response } from "express";
import Product from "../models/Product";
import asyncHandler from "express-async-handler";
import mongoose from "mongoose";

// @desc    Create a new product
// @route   POST /api/products
// @access  Admin
export const createProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, category, price, stockStatus } = req.body;

  if (!req.file) {
    res.status(400);
    throw new Error("Image file is required.");
  }

  if (!mongoose.Types.ObjectId.isValid(category)) {
    res.status(400);
    throw new Error("Invalid category ID.");
  }

  // Check if product with same name exists (case insensitive)
  const existingProduct = await Product.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
  if (existingProduct) {
    res.status(400);
    throw new Error("Product with this name already exists.");
  }

  const product = new Product({
    name,
    image: `/uploads/${req.file.filename}`,
    category: new mongoose.Types.ObjectId(category),
    price,
    stockStatus,
  });

  const createdProduct = await product.save();
  res.status(201).json(createdProduct);
});


// @desc    Get all products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req: Request, res: Response) => {
    const products = await Product.find().populate("category");
    res.json(products);
});

// @desc    Get a product by ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id).populate("category");

    if (product) {
        res.json(product);
    } else {
        res.status(404);
        throw new Error("Product not found.");
    }
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
export const updateProduct = asyncHandler(async (req: Request, res: Response) => {
  const { name, category, price, stockStatus } = req.body;

  const product = await Product.findById(req.params.id);
  if (!product) {
    res.status(404);
    throw new Error("Product not found.");
  }

  // Check for duplicate name (case-insensitive, excluding current product)
  if (name && name.toLowerCase() !== product.name.toLowerCase()) {
    const existingProduct = await Product.findOne({ 
      name: { $regex: new RegExp(`^${name}$`, "i") }
    });

    if (
      existingProduct &&
      (existingProduct._id as mongoose.Types.ObjectId).toString() !== req.params.id
    ) {
      res.status(400);
      throw new Error("Product with this name already exists.");
    }
  }

  if (name !== undefined) product.name = name;
  if (price !== undefined) product.price = price;

  if (category) {
    const categoryId = typeof category === "object" ? category._id : category;
    product.category = categoryId;
  }

  if (stockStatus !== undefined) {
    if (stockStatus === "true" || stockStatus === true) {
      product.stockStatus = true;
    } else if (stockStatus === "false" || stockStatus === false) {
      product.stockStatus = false;
    }
  }

  if (req.file) {
    product.image = `/uploads/${req.file.filename}`;
  }

  const updatedProduct = await product.save();
  res.json(updatedProduct);
});


// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
export const deleteProduct = asyncHandler(async (req: Request, res: Response) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.deleteOne();
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found.");
    }
});
