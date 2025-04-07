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
exports.deleteCategory = exports.updateCategory = exports.getCategoryById = exports.getCategories = exports.createCategory = void 0;
const Category_1 = __importDefault(require("../models/Category"));
const createCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const image = req.file ? `/uploads/${req.file.filename}` : "";
        if (!name || !image) {
            res.status(400).json({ message: "All fields are required" });
            return;
        }
        const newCategory = new Category_1.default({ name, image });
        yield newCategory.save();
        res.status(201).json({ message: "Category created successfully", category: newCategory });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.createCategory = createCategory;
const getCategories = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = yield Category_1.default.find();
        res.json(categories);
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.getCategories = getCategories;
const getCategoryById = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const category = yield Category_1.default.findById(id);
        if (!category) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        res.json(category);
    }
    catch (error) {
        res.status(500).json({ message: "Error fetching category" });
    }
});
exports.getCategoryById = getCategoryById;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const { id } = req.params;
        const { name } = req.body;
        let image = (_a = req.file) === null || _a === void 0 ? void 0 : _a.path; // Get uploaded file path
        // Fetch the existing category
        const existingCategory = yield Category_1.default.findById(id);
        if (!existingCategory) {
            res.status(404).json({ message: "Category not found" });
            return;
        }
        // Update name
        existingCategory.name = name;
        // If a new image is uploaded, update it
        if (image) {
            existingCategory.image = image;
        }
        yield existingCategory.save();
        res.json({ message: "Category updated successfully", category: existingCategory });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating category" });
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield Category_1.default.findByIdAndDelete(req.params.id);
        res.json({ message: "Category deleted" });
    }
    catch (error) {
        res.status(500).json({ message: "Server error" });
    }
});
exports.deleteCategory = deleteCategory;
