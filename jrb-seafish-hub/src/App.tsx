import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from "./pages/Home";
import NotFound from "./pages/404page";
import Contact from "./pages/Contact";
import ProductsPage from "./pages/Products";
import AdminLogin from "./components/AdminLogin";
import AdminDashboard from "./pages/AdminDashboard";
import ProductManagement from "./pages/ProductManagement";
import CategoryManagement from "./pages/CategoryManagement";
import AddCategory from "./components/AddCategory";
import AddProduct from "./components/AddProduct";
import EditCategory from "./components/EditCategory";
import EditProduct from "./components/EditProduct";
import ProtectedRoute from "./components/ProtectedRoute";

const App: React.FC = () => {
  const token = useSelector((state: any) => state.auth.token) ;
  console.log("Token from Redux:", token);
  
  
  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/products" element={<ProductsPage />} />
      <Route path="/adminlogin" element={<AdminLogin />} />

      {/* Protect Admin Routes */}
      <Route path="/admin" element={<ProtectedRoute />}>
        <Route path="dashboard" element={<AdminDashboard />} />
        <Route path="products" element={<ProductManagement />} />
        <Route path="add-product" element={<AddProduct />} />
        <Route path="categories" element={<CategoryManagement />} />
        <Route path="add-category" element={<AddCategory />} />
        <Route path="edit-category/:id" element={<EditCategory />} />
        <Route path="edit-product/:id" element={<EditProduct />} />
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  </Router>
  );
};

export default App;
