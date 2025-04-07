"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProduct = exports.updateProduct = exports.getProductById = exports.getProducts = exports.createProduct = void 0;
const Product_1 = __importDefault(require("../models/Product"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const mongoose_1 = __importDefault(require("mongoose"));
// @desc    Create a new product
// @route   POST /api/products
// @access  Admin
exports.createProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, price, stockStatus } = req.body;
    if (!req.file) {
        res.status(400);
        throw new Error("Image file is required.");
    }
    if (!mongoose_1.default.Types.ObjectId.isValid(category)) {
        res.status(400);
        throw new Error("Invalid category ID.");
    }
    const product = new Product_1.default({
        name,
        image: `/uploads/${req.file.filename}`,
        category: new mongoose_1.default.Types.ObjectId(category), // Convert to ObjectId
        price,
        stockStatus,
    });
    const createdProduct = yield product.save();
    res.status(201).json(createdProduct);
}));
// @desc    Get all products
// @route   GET /api/products
// @access  Public
exports.getProducts = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const products = yield Product_1.default.find().populate("category");
    res.json(products);
}));
// @desc    Get a product by ID
// @route   GET /api/products/:id
// @access  Public
exports.getProductById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findById(req.params.id).populate("category");
    if (product) {
        res.json(product);
    }
    else {
        res.status(404);
        throw new Error("Product not found.");
    }
}));
// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Admin
exports.updateProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { name, category, price, stockStatus } = req.body;
    const product = yield Product_1.default.findById(req.params.id);
    if (!product) {
        res.status(404);
        throw new Error("Product not found.");
    }
    // Only update if fields are provided
    if (name !== undefined)
        product.name = name;
    if (price !== undefined)
        product.price = price;
    // Fix: Convert category to string ID if it's an object
    if (category) {
        const categoryId = typeof category === "object" ? category._id : category;
        product.category = categoryId;
    }
    // Convert string to boolean
    if (stockStatus !== undefined) {
        if (stockStatus === "true" || stockStatus === true) {
            product.stockStatus = true;
        }
        else if (stockStatus === "false" || stockStatus === false) {
            product.stockStatus = false;
        }
    }
    if (req.file) {
        product.image = `/uploads/${req.file.filename}`;
    }
    const updatedProduct = yield product.save();
    res.json(updatedProduct);
}));
// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Admin
exports.deleteProduct = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const product = yield Product_1.default.findById(req.params.id);
    if (product) {
        yield product.deleteOne();
        res.json({ message: "Product removed" });
    }
    else {
        res.status(404);
        throw new Error("Product not found.");
    }
}));
