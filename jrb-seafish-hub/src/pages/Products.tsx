import { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import spices_img from "../assets/img/spices.jpeg";

interface ProductCategory {
  _id: string;
  name: string;
  image: string;
}

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: ProductCategory;
}


const ProductsPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<ProductCategory[]>([]);
console.log(products)
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/categories`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error("Error fetching categories:", err));

    fetch(`${import.meta.env.VITE_API_URL}/products`)
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, []);

  return (
    <>
      <Navbar />
      <div className="container-fluid page-header py-5 bg-secondary">
        <h1 className="text-center text-white display-6">Products</h1>
      </div>

      <div className="container py-5">
        <h1 className="text-center mb-4">All Seafood Fresh</h1>
        
        <div className="input-group mb-5">
          <span className="input-group-text">
            <i className="bi bi-search"></i>
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search for fish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        <div className="row mb-5 d-flex justify-content-center">
          {categories.map((category) => (
            <div key={category._id} className="col-lg-3 col-md-6 mb-4">
              <div className="p-4 rounded border border-secondary category-card">
                <div className="row align-items-center">
                  <div className="col-6 d-flex justify-content-center">
                    <img
                      src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${category.image}`}
                      className="img-fluid rounded-circle"
                      alt={category.name}
                      style={{ width: "120px", height: "120px", objectFit: "cover" }}
                    />
                  </div>
                  <div className="col-6 text-center">
                    <h5>{category.name}</h5>
                  </div>
                </div>
              </div>
            </div>
          ))}
           {/* Spices (Disabled) */}
           <div className="col-lg-3 col-md-6 mb-4">
            <div className="p-4 rounded bg-light border border-secondary opacity-50 position-relative">
              <span className="position-absolute top-0 start-50 translate-middle badge bg-danger text-white">
                Coming Soon
              </span>
              <div className="row align-items-center">
                <div className="col-6 d-flex justify-content-center">
                  <img
                    src={spices_img}
                    className="img-fluid rounded-circle"
                    alt="Spices"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                    }}
                  />
                </div>
                <div className="col-6 text-center">
                  <h5 className="text-muted">Spices</h5>
                  <button
                    className="btn border border-secondary rounded-pill px-3 text-muted"
                    disabled
                  >
                    Coming Soon
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {categories.map((category) => {
        const filteredProducts = products.filter(
          (product) =>
            product.category._id === category._id && // Matching category ID instead of name
            product.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        
        
          return (
            <div key={category._id} className="mb-5">
              <h1 className="text-center text-primary border-bottom pb-2 fw-bold mb-5">
                {category.name}
              </h1>
              <div className="row g-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
                    <div key={product._id} className="col-md-6 col-lg-4">
                      <div className="card border border-secondary shadow-sm position-relative">
                        <div 
                          className="position-absolute top-0 end-0 bg-secondary text-white px-2 py-1 rounded-bottom-start"
                          style={{ fontSize: "14px", fontWeight: "bold" }}
                        >
                          500g
                        </div>
                        <img
                           src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${product.image}`}
                          className="card-img-top"
                          alt={product.name}
                          style={{ height: "200px", objectFit: "cover" }}
                        />
                        <div className="card-body text-center">
                          <h5 className="card-title">{product.name}</h5>
                          <h3 className="text-primary fw-bold">₹{product.price}</h3>
                        </div>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-center text-muted">No products available</p>
                )}
              </div>
            </div>
          );
        })}
      </div>
      <Footer />
    </>
  );
};

export default ProductsPage;