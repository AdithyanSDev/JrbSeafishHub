import React from "react";
import freshWater from "../assets/img/freshwater.webp"; // Replace with actual image
import seaFish from "../assets/img/mackerel.png"; // Replace with actual image
import shellfish from "../assets/img/crab.jpg"; // Replace with actual image

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
      image: freshWater,
      bgColor: "bg-primary",
      borderColor: "border-primary",
      title: "Fresh Water Fish",
      textColor: "bg-light text-dark",
    },
    {
      image: seaFish,
      bgColor: "bg-dark",
      borderColor: "border-dark",
      title: "Seafish",
      textColor: "bg-light text-dark",
    },
    {
      image: shellfish  ,
      bgColor: "bg-info",
      borderColor: "border-info",
      title: "Shell Fishes",
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
