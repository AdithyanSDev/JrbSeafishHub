"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = require("../controllers/ProductController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const uploadMiddleware_1 = require("../middleware/uploadMiddleware");
const router = express_1.default.Router();
router.post("/", uploadMiddleware_1.upload.single("image"), ProductController_1.createProduct);
router.get("/", ProductController_1.getProducts);
router.get("/:id", ProductController_1.getProductById);
router.put("/:id", authMiddleware_1.protectAdmin, uploadMiddleware_1.upload.single("image"), ProductController_1.updateProduct);
router.delete("/:id", authMiddleware_1.protectAdmin, ProductController_1.deleteProduct);
exports.default = router;
