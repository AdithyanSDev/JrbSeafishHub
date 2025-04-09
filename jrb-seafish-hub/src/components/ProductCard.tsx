import  { useState, useEffect } from "react";
import axios from "axios";

interface Product {
  _id: string;
  name: string;
  image: string;
  price: number;
  category: { _id: string; name: string };
  stockStatus: boolean; 
}

interface Category {
  _id: string;
  name: string;
  image: string;
}

const ProductCard = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategory, setActiveCategory] = useState<Category | null>(null);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/categories`)
      .then((response) => {
        setCategories(response.data);
        if (response.data.length > 0) {
          setActiveCategory(response.data[0]);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_API_URL}/products`)
      .then((response) => setProducts(response.data))
      .catch((error) => console.error("Error fetching products:", error));
  }, []);

  const filteredProducts = activeCategory
    ? products.filter((product) => product.category._id === activeCategory._id) // Fixed filtering
    : [];

  return (
    <div className="container-fluid fruite py-5">
      <div className="container py-5">
        <div className="tab-class text-center">
          <div className="row g-4">
            <div className="col-lg-4 text-start">
              <h1>OUR PRODUCTS</h1>
            </div>
            <div className="col-lg-8 text-end">
              <ul className="nav nav-pills d-inline-flex text-center mb-5">
                {categories.map((category) => (
                  <li className="nav-item" key={category._id}>
                    <button
                      className={`d-flex py-2 m-2 rounded-pill ${
                        activeCategory?._id === category._id
                          ? "bg-primary text-white"
                          : "bg-light text-dark"
                      }`}
                      onClick={() => setActiveCategory(category)}
                      style={{
                        width: "130px",
                        border: "none",
                        cursor: "pointer",
                        outline: "none",
                      }}
                    >
                      <span className="w-100">{category.name}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="tab-content">
            <div className="tab-pane fade show p-0 active">
              <div className="row g-4">
              {filteredProducts.length > 0 ? (
  filteredProducts.map((product) => (
    <div className="col-12 col-md-4 col-lg-4" key={product._id}>
      <div
        className={`rounded position-relative fruite-item border border-secondary ${
          !product.stockStatus ? "out-of-stock" : ""
        }`}
        style={{
          opacity: product.stockStatus ? 1 : 0.6,
          pointerEvents: product.stockStatus ? "auto" : "none",
          filter: product.stockStatus ? "none" : "grayscale(30%)",
          position: "relative",
        }}
      >
        {!product.stockStatus && (
          <div
            className="position-absolute top-50 start-50 translate-middle text-white fw-bold"
            style={{
              backgroundColor: "rgba(0, 0, 0, 0.6)",
              padding: "10px 20px",
              borderRadius: "10px",
              zIndex: 2,
              fontSize: "20px",
            }}
          >
            Out of Stock
          </div>
        )}

        <div
          className="position-absolute top-0 end-0 bg-secondary text-white px-2 py-1 rounded-bottom-start"
          style={{ fontSize: "14px", fontWeight: "bold" }}
        >
          500g
        </div>
        <div className="fruite-img text-center">
          <img
            src={`${import.meta.env.VITE_API_URL.replace("/api", "")}${product.image}`}
            className="img-fluid"
            alt={product.name}
            style={{
              width: "200px",
              height: "200px",
              objectFit: "cover",
              borderRadius: "10px",
              display: "block",
              margin: "auto",
            }}
          />
        </div>
        <div className="p-4 border-top-0 rounded-bottom text-center">
          <h5>{product.name}</h5>
          <h3 className="text-primary">₹{product.price}</h3>
        </div>
      </div>
    </div>
  ))
) : (
  <div className="text-center w-100">
    <h5 className="text-muted">No products available in this category</h5>
  </div>
)}

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
