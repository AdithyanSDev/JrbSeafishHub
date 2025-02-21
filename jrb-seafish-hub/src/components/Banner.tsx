import React from "react";
import bannerImage from "../assets/img/fish.png";

const Banner: React.FC = () => {
  return (
    <div
      className="container-fluid banner my-5"
      style={{
        background: "linear-gradient(135deg, #0a3d62, #74b9ff)", // Dark Blue → Light Blue Gradient
        padding: "50px 0",
      }}
    >
      <div className="container py-5">
        <div className="row g-4 align-items-center">
          {/* Left Content */}
          <div className="col-lg-6">
            <div className="py-4">
              <h1 className="display-3 text-primary">Fresh & Clean Seafood </h1>
              <p className="fw-normal display-5 text-light mb-4">
              Delivered to Your Doorstep!
              </p>
              <p className="mb-4 text-light">
              We offer fresh fish sourced directly from the Malabar market, ensuring the highest quality. Choose from whole fish or enjoy the convenience of expertly cleaned and sliced options—ready to cook and savor. Experience the authentic taste of premium seafood with us!
              </p>
             
            </div>
          </div>

          {/* Right Image */}
          <div className="col-lg-6">
            <div className="position-relative">
              <img
                src={bannerImage}
                className="img-fluid w-100 rounded"
                alt="Banner"
                style={{
                  height: "350px",
                  objectFit: "cover",
                  borderRadius: "10px",
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Banner;
