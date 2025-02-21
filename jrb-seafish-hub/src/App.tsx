import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import NotFound from "./pages/404page"; // Import 404 Component
import Contact from "./pages/Contact";
import ProductsPage from "./pages/Products";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/products" element={<ProductsPage />} />
        {/* Catch all other routes */}
        <Route path="*" element={<NotFound />} />
        
      </Routes>
    </Router>
  );
};

export default App;
