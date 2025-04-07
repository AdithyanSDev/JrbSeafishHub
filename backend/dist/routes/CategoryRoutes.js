"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const CategoryController_1 = require("../controllers/CategoryController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const router = express_1.default.Router();
router.post("/", uploadMiddleware_1.upload.single("image"), CategoryController_1.createCategory);
router.get("/", CategoryController_1.getCategories);
router.put("/:id", authMiddleware_1.protectAdmin, uploadMiddleware_1.upload.single("image"), CategoryController_1.updateCategory);
router.get("/:id", CategoryController_1.getCategoryById); // Add this route
router.delete("/:id", authMiddleware_1.protectAdmin, CategoryController_1.deleteCategory);
exports.default = router;
