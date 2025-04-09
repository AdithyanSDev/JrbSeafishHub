import React from "react";

const Features: React.FC = () => {
  const featureData = [
    { 
      icon: "fas fa-fish", 
      title: "Fresh Catch", 
      desc: "Fresh and tasty fishes directly from the harbor." 
    },
    { 
      icon: "fas fa-shipping-fast", 
      title: "Fast Home Delivery", 
      desc: "Fast doorstep delivery within 30km of the shop." 
    },
    { 
      icon: "fas fa-cut", 
      title: "Cleaned & Ready", 
      desc: "Cleaned and cut/sliced options available for convenience." 
    },
    
    { 
      icon: "fas fa-water", 
      title: "Wide Variety", 
      desc: "Seafood, shellfish, and freshwater fish available." 
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
