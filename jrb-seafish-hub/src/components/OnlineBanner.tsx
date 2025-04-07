import React from "react";
import bannerImage from "../assets/img/fish_pump.png";

const OnlineBanner: React.FC = () => {
  return (
    <div
      className="container-fluid banner my-5"
      style={{
        background: "linear-gradient(135deg,rgb(57, 182, 184),rgb(33, 199, 255))", // Dark Blue → Light Blue Gradient
        padding: "50px 0",
      }}
    >
      <div className="container py-5">
        <div className="row g-4 align-items-center">
          {/* Left Content */}
          <div className="col-lg-6">
            <div className="py-4">
              <h1 className="display-5 text-secondary">
             Online shopping activating soon...
              </h1>
              <h3 className="mb-4 text-light">
              You could purchase your products online and receive them at home.
               
              </h3>
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

export default OnlineBanner;
