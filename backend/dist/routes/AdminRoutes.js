"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const AdminController_1 = require("../controllers/AdminController");
const authMiddleware_1 = require("../middleware/authMiddleware");
const router = express_1.default.Router();
router.post("/login", AdminController_1.adminLogin);
router.post("/logout", authMiddleware_1.protectAdmin, AdminController_1.adminLogout); // Logout Route
router.get("/verify-token", authMiddleware_1.protectAdmin, AdminController_1.verifyAdminToken); // Verify token
exports.default = router;
