import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import path from "path";
import connectDB from "./config/db";
import adminRoutes from "./routes/AdminRoutes";
import productRoutes from "./routes/ProductRoutes";
import categoryRoutes from "./routes/CategoryRoutes";

dotenv.config();
connectDB();


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Routes
app.use("/api/admin", adminRoutes);
app.use("/api/products", productRoutes);
app.use("/api/categories", categoryRoutes);

// Serve static uploads
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

// Serve frontend build
const __dirnamePath = path.resolve(); // alias to avoid name conflict
app.use(express.static(path.join(__dirnamePath, "../frontend/build"))); // Adjust path to your real frontend build

// Catch-all route (for React BrowserRouter)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirnamePath, "../frontend/build/index.html"));
});
console.log("Connected to MongoDB");
console.log("Loaded ENV Email:", process.env.ADMIN_EMAIL);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Server running on http://localhost:${PORT}`)
);
