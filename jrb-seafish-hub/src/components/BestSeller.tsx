import React from "react";
import product1 from "../assets/img/Coconut_oil.webp";
import product2 from "../assets/img/coriander_powder.webp";
import product3 from "../assets/img/jeera powder.webp";
import product4 from "../assets/img/garam masala.jpg";
import product5 from "../assets/img/mix masala.webp";
import product6 from "../assets/img/fish masala.jpg";

// Reusable Product Card Component
const ProductCard: React.FC<{
  image: string;
  title: string;
}> = ({ image, title }) => {
  return (
    <div className="col-lg-6 col-xl-4">
      <div className="p-4 rounded bg-light">
        <div className="row align-items-center">
          <div className="col-6">
            <img src={image} className="img-fluid rounded-circle w-100" alt={title} />
          </div>
          <div className="col-6 text-center">
            <a href="#" className="h5">{title}</a>
           
          </div>
        </div>
      </div>
    </div>
  );
};

// Bestseller Products Section
const BestsellerProducts: React.FC = () => {
  const products = [
    { image: product1, title: "Organic Coconut Oil" },
    { image: product2, title: "Coriander powder"},
    { image: product3, title: "Jeera powder"},
    { image: product4, title: "Garam Masala" },
    { image: product5, title: "Mix masala powder"},
    { image: product6, title: "Fish masala powder" },
  ];

  return (
    <div className="container-fluid py-5">
      <div className="container py-5">
        <div className="text-center mx-auto mb-5" style={{ maxWidth: "700px" }}>
          <h1 className="display-4">Bestseller Products</h1>
          <p>Explore our best-selling organic and fresh produce.</p>
        </div>
        <div className="row g-4">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default BestsellerProducts;
