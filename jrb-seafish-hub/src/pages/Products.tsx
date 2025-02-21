import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import pepper_powder from "../assets/img/Pepper_powder.jpg";
import turmeric_powder from "../assets/img/Turmeric_powder.jpg";
import chilli_powder from "../assets/img/chilli_powder.jpg";
import chicken_masala from "../assets/img/Chicken_masala.jpg";
import coconut_oil from "../assets/img/Coconut_oil.webp";
import Fish_masala from "../assets/img/fish masala.jpg";
import Pathiri_Powder from "../assets/img/pathiri_podi.jpg";
import Atta_Powder from "../assets/img/chappathi powder.webp";
import Ragi_Powder from "../assets/img/ragi powder.jpg";
import Coriander_Powder from "../assets/img/coriander_powder.webp";
import Jeera_Powder from "../assets/img/jeera powder.webp";
import Garam_Masala from "../assets/img/garam masala.jpg";
import Sambar_Powder from "../assets/img/sambar powder.jpg";
import Garlic_Powder from "../assets/img/garlic powder.jpg";
import Ginger_Powder from "../assets/img/Ginger powder.webp";

const products = [
  { name: "Pepper Powder", image: pepper_powder, category: "Spices" },
  { name: "Turmeric Powder", image: turmeric_powder, category: "Spices" },
  { name: "Chilli Powder", image: chilli_powder, category: "Spices" },
  { name: "Chicken Masala", image: chicken_masala, category: "Instant Mix" },
  { name: "Coconut oil", image: coconut_oil, category: "Coconut" },
  { name: "Fish Masala", image: Fish_masala, category: "Instant Mix" },
  { name: "Pathiri Powder", image: Pathiri_Powder, category: "Rice Powder" },
  { name: "Chappathi Powder", image: Atta_Powder, category: "Rice Powder" },
  { name: "Ragi Powder", image: Ragi_Powder, category: "Rice Powder" },
  { name: "Coriander Powder", image: Coriander_Powder, category: "Spices" },
  { name: "Jeera Powder", image: Jeera_Powder, category: "Spices" },
  { name: "Garam Masala", image: Garam_Masala, category: "Instant Mix" },
  { name: "Sambar Powder", image: Sambar_Powder, category: "Instant Mix" },
  { name: "Garlic Powder", image: Garlic_Powder, category: "Spices" },
  { name: "Ginger Powder", image: Ginger_Powder, category: "Spices" },
];

const categoryCounts: Record<string, number> = products.reduce((acc, product) => {
  acc[product.category] = (acc[product.category] || 0) + 1;
  return acc;
}, {} as Record<string, number>);

const categories = ["All", ...Object.keys(categoryCounts)];

const ProductsPage = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const filteredProducts = products.filter(
    (product) =>
      (selectedCategory === "All" || product.category === selectedCategory) &&
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const paginatedProducts = filteredProducts.slice(startIndex, startIndex + productsPerPage);

  return (
    <>
      <Navbar />
      <div className="container-fluid page-header py-5 bg-secondary">
        <h1 className="text-center text-white display-6">Shop</h1>
      </div>
      <div className="container py-5">
        <h1 className="text-center mb-4">Our Organic Products</h1>

        <div className="row">
          <div className="col-lg-3">
            <h4>Categories</h4>
            <ul className="list-group">
              {categories.map((category) => (
                <li
                  key={category}
                  className={`list-group-item ${selectedCategory === category ? "active" : ""}`}
                  onClick={() => { setSelectedCategory(category); setCurrentPage(1); }}
                  style={{ cursor: "pointer" }}
                >
                  {category} ({categoryCounts[category] || products.length})
                </li>
              ))}
            </ul>
          </div>

          <div className="col-lg-9">
            <input
              type="text"
              className="form-control mb-3"
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => { setSearchTerm(e.target.value); setCurrentPage(1); }}
            />

            <div className="row g-4">
              {paginatedProducts.map((product) => (
                <div key={product.name} className="col-md-4">
                  <div className="card border-0 shadow-sm">
                    <img src={product.image} className="card-img-top" alt={product.name} />
                    <div className="card-body text-center">
                      <h5 className="card-title">{product.name}</h5>
                      <p className="text-muted">{product.category}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="d-flex justify-content-center mt-4">
              <button
                className="btn btn-primary me-2"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                Previous
              </button>
              <span className="align-self-center">Page {currentPage} of {totalPages}</span>
              <button
                className="btn btn-primary ms-2"
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next
              </button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;