import React from "react";
import { useNavigate } from "react-router-dom";

const Footer: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid bg-dark text-white-50 footer pt-5 mt-5">
      <div className="container py-5">
        {/* Top Section */}
        <div className="pb-4 mb-4" style={{ borderBottom: "1px solid rgba(226, 175, 24, 0.5)" }}>
          <div className="row g-4">
            <div className="col-lg-3">
              <a href="#">
                <h1 className="text-primary mb-0">JRB Seafish Hub</h1>
                <p className="text-secondary mb-0">Organic products</p>
              </a>
            </div>
            <div className="col-lg-6">
              <div className="position-relative mx-auto">
                {/* Disabled Input */}
                <input
                  className="form-control border-0 w-100 py-3 px-4 rounded-pill"
                  placeholder="Enquiry Form"
                  disabled
                />
                {/* Navigate to Contact Page */}
                <button
                  type="button"
                  onClick={() => navigate("/contact")}
                  className="btn btn-primary border-0 border-secondary py-3 px-4 position-absolute rounded-pill text-white"
                  style={{ top: 0, right: 0 }}
                >
                  Enquiry Now
                </button>
              </div>
            </div>
            <div className="col-lg-3">
              <div className="d-flex justify-content-end pt-3">
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#">
                  <i className="fab fa-twitter"></i>
                </a>
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#">
                  <i className="fab fa-facebook-f"></i>
                </a>
                <a className="btn btn-outline-secondary me-2 btn-md-square rounded-circle" href="#">
                  <i className="fab fa-youtube"></i>
                </a>
                <a className="btn btn-outline-secondary btn-md-square rounded-circle" href="#">
                  <i className="fab fa-linkedin-in"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Sections */}
        <div className="row g-5">
          {/* Why People Like Us */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Why People Like us!</h4>
              <p className="mb-4">
              We offer premium organic homemade spices with no additives and fresh seafood from the Malabar market, available whole or expertly cleaned & sliced for your convenience. Pure quality, fresh flavors!
              </p>
            </div>
          </div>

          {/* Shop Info */}
          <div className="col-lg-3 col-md-6">
            <div className="d-flex flex-column text-start footer-item">
              <h4 className="text-light mb-3">Shop Info</h4>
              <a className="btn-link" href="#">About Us</a>
              <a className="btn-link" href="#">Contact Us</a>
              <a className="btn-link" href="#">Privacy Policy</a>
              <a className="btn-link" href="#">Terms & Condition</a>
              <a className="btn-link" href="#">FAQs & Help</a>
            </div>
          </div>

          {/* Contact Info */}
          <div className="col-lg-3 col-md-6">
            <div className="footer-item">
              <h4 className="text-light mb-3">Contact</h4>
              <p>No.1 Naveen Complex, Ward No.22, Budigere Road, Devanahalli Town, Bangalore - 562110, Karnataka</p>
              <p>Email: seafish.jrb@gmail.com</p>
              <p>Phone:(+91) 7259494007</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
