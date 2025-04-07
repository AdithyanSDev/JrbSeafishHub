"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const path_1 = __importDefault(require("path"));
const db_1 = __importDefault(require("./config/db"));
const AdminRoutes_1 = __importDefault(require("./routes/AdminRoutes"));
const ProductRoutes_1 = __importDefault(require("./routes/ProductRoutes"));
const CategoryRoutes_1 = __importDefault(require("./routes/CategoryRoutes"));
dotenv_1.default.config();
(0, db_1.default)();
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, cors_1.default)());
// Routes
app.use("/api/admin", AdminRoutes_1.default);
app.use("/api/products", ProductRoutes_1.default);
app.use("/api/categories", CategoryRoutes_1.default);
// Serve static uploads
app.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
// Serve frontend build
const __dirnamePath = path_1.default.resolve(); // alias to avoid name conflict
app.use(express_1.default.static(path_1.default.join(__dirnamePath, "../frontend/build"))); // Adjust path to your real frontend build
// Catch-all route (for React BrowserRouter)
app.get("*", (req, res) => {
    res.sendFile(path_1.default.join(__dirnamePath, "../frontend/build/index.html"));
});
console.log("Connected to MongoDB");
console.log("Loaded ENV Email:", process.env.ADMIN_EMAIL);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
