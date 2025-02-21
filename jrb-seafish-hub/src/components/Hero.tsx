import React from "react";
import spices from "../assets/img/spices.jpeg"; // Correct import
import cocunut_oil from "../assets/img/Coconut_oil.webp"; // Correct import

const Hero: React.FC = () => {
  return (
    <div className="container-fluid py-5 mb-5 hero-header">
      <div className="container py-5">
        <div className="row g-5 align-items-center">
          <div className="col-md-12 col-lg-7">
            <h4 className="mb-3 text-secondary">100% Organic Spices</h4>
            <h1 className="mb-5 display-3 text-primary">
              Authentic Spices and Organic Essentials
            </h1>
          </div>
          <div className="col-md-12 col-lg-5">
            <div
              id="carouselId"
              className="carousel slide position-relative"
              data-bs-ride="carousel"
            >
              <div className="carousel-inner" role="listbox">
                <div className="carousel-item active rounded">
                  <img
                    src={spices}
                    className="img-fluid w-100 bg-secondary rounded"
                    alt="First slide"
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <a href="#" className="btn px-4 py-2 text-white rounded">
                    Spices
                  </a>
                </div>
                <div className="carousel-item rounded">
                  <img
                    src={cocunut_oil}
                    className="img-fluid w-100 rounded"
                    alt="Second slide"
                    style={{
                      height: "400px",
                      objectFit: "cover",
                      borderRadius: "10px",
                    }}
                  />
                  <a href="#" className="btn px-4 py-2 text-white rounded">
                    Coconut Oil
                  </a>
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
