import React, { useState } from "react";
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

// Product List with Descriptions
const products = [
  { name: "Pepper Powder", image: pepper_powder, category: "Spices", description: "Aromatic and rich, our homemade pepper powder is made from hand-picked organic peppercorns with no additives." },
  { name: "Turmeric Powder", image: turmeric_powder, category: "Spices", description: "Golden goodness! Our turmeric powder is 100% organic, rich in curcumin, and perfect for cooking and wellness." },
  { name: "Chilli Powder", image: chilli_powder, category: "Spices", description: "Sun-dried and ground to perfection, our homemade chilli powder delivers the perfect balance of heat and flavor." },
  { name: "Chicken Masala", image: chicken_masala, category: "Instant Mix", description: "A homemade blend of aromatic spices, perfect for crafting flavorful and authentic chicken curries effortlessly." },
  { name: "Coconut oil", image: coconut_oil, category: "Coconut", description: "Cold-pressed and unrefined, our coconut oil retains all its natural goodness, making it ideal for cooking and skincare." },
  { name: "Fish Masala", image: Fish_masala, category: "Instant Mix", description: "A traditional blend of organic spices, giving your fish dishes an irresistible depth of flavor, without any additives." },
  { name: "Pathiri Powder", image: Pathiri_Powder, category: "Rice Powder", description: "Finely milled and gluten-free, our pathiri powder is perfect for making soft and authentic Malabar pathiris." },
  { name: "Chappathi Powder", image: Atta_Powder, category: "Rice Powder", description: "Made from premium wheat, our homemade Chappathi Powder guarantees soft and nutritious chapatis with a rich taste." },
  { name: "Ragi Powder", image: Ragi_Powder, category: "Rice Powder", description: "Nutritious and gluten-free, our homemade ragi powder is packed with fiber and essential minerals for a healthy diet." },
  { name: "Coriander Powder", image: Coriander_Powder, category: "Spices", description: "Fragrant and full of flavor, our coriander powder is freshly ground from organic coriander seeds for authentic taste." },
  { name: "Jeera Powder", image: Jeera_Powder, category: "Spices", description: "A digestive-friendly spice, our jeera powder is ground from the finest cumin seeds for rich, earthy flavors." },
  { name: "Garam Masala", image: Garam_Masala, category: "Instant Mix", description: "A warm and aromatic blend of organic homemade spices, essential for authentic Indian dishes." },
  { name: "Sambar Powder", image: Sambar_Powder, category: "Instant Mix", description: "A traditional South Indian spice mix crafted for rich and flavorful sambar, made with homemade organic ingredients." },
  { name: "Garlic Powder", image: Garlic_Powder, category: "Spices", description: "Aromatic and convenient, our homemade garlic powder is free from preservatives and rich in natural flavors." },
  { name: "Ginger Powder", image: Ginger_Powder, category: "Spices", description: "Zesty and full of warmth, our homemade ginger powder is great for teas, curries, and wellness remedies." },
];

// Available Categories
const categories = ["Spices", "Instant Mix", "Coconut", "Rice Powder"];

const ProductCard: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState("Spices");

  // Filter Products Based on Active Category
  const filteredProducts = products.filter(
    (product) => product.category === activeCategory
  );

  return (
    <div className="container-fluid fruite py-5">
      <div className="container py-5">
        <div className="tab-class text-center">
          {/* Header Section */}
          <div className="row g-4">
            <div className="col-lg-4 text-start">
              <h1>Our Organic Products</h1>
            </div>
            <div className="col-lg-8 text-end">
              <ul className="nav nav-pills d-inline-flex text-center mb-5">
                {categories.map((category, index) => (
                  <li className="nav-item" key={index}>
                    <button
                      className={`d-flex py-2 m-2 rounded-pill ${
                        activeCategory === category
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
                      <span className="w-100">{category}</span>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Product Display Section */}
          <div className="tab-content">
            <div className="tab-pane fade show p-0 active">
              <div className="row g-4">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product, index) => (
                    <div className="col-md-6 col-lg-4 col-xl-3" key={index}>
                      <div className="rounded position-relative fruite-item">
                        <div className="fruite-img">
                          <img
                            src={product.image}
                            className="img-fluid w-100 rounded-top"
                            alt={product.name}
                          />
                        </div>
                        <div className="p-4 border border-secondary border-top-0 rounded-bottom">
                          <h4>{product.name}</h4>
                          <p>{product.description}</p>
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
