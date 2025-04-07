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
              <h1 className="display-5 text-primary">
                Why should you add fish in your diet?{" "}
              </h1>
              <p className="mb-4 text-light">
                SEAFOOD, is one of the healthiest food on the planet that can be
                eaten daily. FISH is a delicious food as it is packed with lots
                of flavours and diverse taste and is easy to prepare. Eating
                FISH on a regular basis enhances several aspects of your health
                for grown-ups as well as kids.
              </p>

              <p className="fw-normal display-6 text-light mb-4">
              Nutritional Facts 
              </p>

              <p className="mb-4 text-light">
                FISHES are rich in important nutrients, including high-quality
                proteins, various vitamins and minerals like Iodine, Iron,
                Magnesium, Potassium, Selenium, Zinc etc. FISHES like SARDINE
                also pack omega-3 fatty acids, and vitamins A, B, D and K. Each
                of these nutrients helps in the development of bones, teeth,
                nervous system, immune system, muscles and heart functioning,
                thyroid gland functioning, cell repair, to help relieve joint
                discomfort, enhance skin health, improve vision and brain
                health.
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
