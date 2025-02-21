import React from "react";
import feature1 from "../assets/img/spices_transparent.jpg";
import feature2 from "../assets/img/cocunut_oil_transparent.jpg";
import feature3 from "../assets/img/fresh_fishes_sliced.webp";

// Reusable Service Item Component
const ServiceItem: React.FC<{
  image: string;
  bgColor: string;
  borderColor: string;
  title: string;
  textColor: string;
}> = ({ image, bgColor, borderColor, title, textColor }) => {
  return (
    <div className="col-md-6 col-lg-4 d-flex flex-column align-items-center text-center">
      <a href="#">
        <div
          className={`service-item ${bgColor} rounded border ${borderColor}`}
        >
          <img
            src={image}
            className="img-fluid rounded-top w-100"
            alt={title}
            style={{
              height: "250px",
              objectFit: "cover",
              borderRadius: "10px",
            }}
          />
          <div className="px-4 rounded-bottom">
            <div
              className={`service-content d-flex flex-column align-items-center justify-content-center text-center p-4 rounded ${textColor}`}
            >
              <h4 className="m-0">{title}</h4>
            </div>
          </div>
        </div>
      </a>
    </div>
  );
};

// Service Section Component
const ServiceSection: React.FC = () => {
  const services = [
    {
      image: feature1,
      bgColor: "bg-secondary",
      borderColor: "border-secondary",
      title: "Organic Spices",
      textColor: "bg-primary text-white",
    },
    {
      image: feature2,
      bgColor: "bg-dark",
      borderColor: "border-dark",
      title: "Coconut Oil",
      textColor: "bg-light text-dark", // Changed to dark text color
    },
    {
      image: feature3,
      bgColor: "bg-info",
      borderColor: "border-info",
      title: "Fresh Fishes",
      textColor: "bg-secondary text-white",
    },
  ];

  return (
    <div className="container-fluid service py-5">
      <div className="container py-5">
        <div className="row g-4 justify-content-center">
          {services.map((service, index) => (
            <ServiceItem key={index} {...service} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default ServiceSection;
