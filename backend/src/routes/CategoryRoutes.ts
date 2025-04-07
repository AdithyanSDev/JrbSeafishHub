    import express from "express";
    import { createCategory, getCategories, deleteCategory, updateCategory, getCategoryById } from "../controllers/CategoryController";
    import { protectAdmin } from "../middleware/authMiddleware";
import { upload } from "../middleware/uploadMiddleware";

    const router = express.Router();
    router.post("/", upload.single("image"), createCategory);
    router.get("/", getCategories);
    router.put("/:id", protectAdmin, upload.single("image"), updateCategory);
    router.get("/:id", getCategoryById); // Add this route

    router.delete("/:id", protectAdmin, deleteCategory);
    export default router;
