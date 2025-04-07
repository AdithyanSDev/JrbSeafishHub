import express from "express";
import { adminLogin, adminLogout, verifyAdminToken } from "../controllers/AdminController";
import { protectAdmin } from "../middleware/authMiddleware";

const router = express.Router();

router.post("/login", adminLogin);
router.post("/logout", protectAdmin, adminLogout); // Logout Route
router.get("/verify-token", protectAdmin, verifyAdminToken); // Verify token

export default router;
