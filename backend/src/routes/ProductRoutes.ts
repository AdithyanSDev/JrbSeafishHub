import express from "express";
import { createProduct, getProducts, deleteProduct, updateProduct, getProductById } from "../controllers/ProductController";
import { protectAdmin } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

const router = express.Router();
router.post("/", upload.single("image"), createProduct);
router.get("/", getProducts);
router.get("/:id", getProductById);
router.put("/:id", protectAdmin, upload.single("image"), updateProduct);
router.delete("/:id", protectAdmin, deleteProduct);


export default router;
