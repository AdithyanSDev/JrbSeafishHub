import React from "react";
import banner from "../assets/img/banner.webp"; // Correct import
import seafood_banner from "../assets/img/seafood-banner.jpg"; // Correct import
import seafood from "../assets/img/seafood.jpg"; // Correct import

const Hero: React.FC = () => {
  return (
    <div className="container-fluid py-5 mb-5 hero-header">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          {/* Text Section */}
          <div className="col-md-12 col-lg-6">
            <h4 className="mb-3" style={{ color: "#0077b6" }}>Fresh from the Ocean</h4>
            <h1 className="mb-4 display-3 text-dark">
              Premium Fresh Seafood
            </h1>
            <p className="mb-5 text-muted">
              Sourced directly from the Malabar coast, our seafood is fresh, cleaned, and ready to cook.  
            </p>
            <a href="/products" className="btn btn-lg text-white px-4 py-2" style={{ backgroundColor: "#0077b6", borderRadius: "8px" }}>
              Explore Products
            </a>
          </div>

          {/* Carousel Section - Increased Size */}
          <div className="col-md-12 col-lg-6">
            <div
              id="carouselId"
              className="carousel slide position-relative"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active rounded">
                  <img
                    src={seafood}
                    className="img-fluid w-100 bg-secondary rounded"
                    alt="First slide"
                    style={{
                      height: "450px", // Increased height
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <a href="#" className="btn px-4 py-2 text-white rounded">
                    Seafood
                  </a>
                </div>
                <div className="carousel-item rounded">
                  <img
                    src={seafood_banner}
                    className="img-fluid w-100 rounded"
                    alt="Second slide"
                    style={{
                      height: "450px", // Increased height
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
                <div className="carousel-item rounded">
                  <img
                    src={banner}
                    className="img-fluid w-100 rounded"
                    alt="Third slide"
                    style={{
                      height: "450px", // Increased height
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                </div>
              </div>
              <button
                className="carousel-control-prev"
                type="button"
                data-bs-target="#carouselId"
                data-bs-slide="prev"
              >
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
              </button>
              <button
                className="carousel-control-next"
                type="button"
                data-bs-target="#carouselId"
                data-bs-slide="next"
              >
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
