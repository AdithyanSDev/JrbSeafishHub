import React from "react";

const Features: React.FC = () => {
  const featureData = [
    { 
      icon: "fas fa-shipping-fast", 
      title: "Fast & Reliable Delivery", 
      desc: "Get your order delivered to your doorstep quickly and efficiently." 
    },
    { 
      icon: "fas fa-seedling", 
      title: "Homemade Spices", 
      desc: "Pure homemade organic spices – flavorful, and free from additives." 
    },
    { 
      icon: "fas fa-check-circle", 
      title: "Guaranteed Quality", 
      desc: "Visit our store to check the quality of our products yourself." 
    },
    { 
      icon: "fas fa-headset", 
      title: "24/7 Customer Support", 
      desc: "Round-the-clock support for customer queries." 
    },
  ];

  return (
    <div className="container-fluid featurs py-5">
      <div className="container py-5">
        <div className="row g-4">
          {featureData.map((feature, index) => (
            <div className="col-md-6 col-lg-3" key={index}>
              <div className="featurs-item text-center rounded bg-light p-4">
                {/* Feature Icon */}
                <div className="featurs-icon btn-square rounded-circle bg-secondary mb-4 mx-auto d-flex align-items-center justify-content-center" style={{ width: "80px", height: "80px" }}>
                  <i className={`${feature.icon} fa-3x text-white`}></i>
                </div>
                {/* Feature Title & Description */}
                <h5 className="text-primary">{feature.title}</h5>
                <p className="mb-0">{feature.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
