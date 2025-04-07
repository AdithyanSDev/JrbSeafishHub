import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="container-fluid fixed-top">
      {/* Topbar with Ocean Blue Color */}
      <div className="container topbar" style={{ backgroundColor: "#0077b6" }} >
        <div className="d-flex justify-content-between">
          <div className="top-info ps-2">
            <small className="me-3">
              <i className="fas fa-map-marker-alt me-2 text-white"></i>
              <a href="#" className="text-white">
                No.1 Naveen Complex, Ward No.22, Budigere Road, Devanahalli Town, Bangalore - 562110, Karnataka
              </a>
            </small>
            <small className="me-3">
              <i className="fas fa-envelope me-2 text-white"></i>
              <a href="#" className="text-white">seafish.jrb@gmail.com</a>
            </small>
          </div>
        </div>
      </div>

      {/* Navbar Section */}
      <div className="container px-0">
        <nav className="navbar navbar-light bg-white navbar-expand-xl d-flex justify-content-between align-items-center">
          {/* Brand Section */}
          <Link to="/" className="navbar-brand flex-shrink-0">
            <h1 className="text-dark display-6 mb-0">JRB Seafish Hub</h1>
          </Link>

          {/* Toggle Button for Mobile */}
          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars text-dark"></span>
          </button>

          {/* Navbar Menu */}
          <div className="collapse navbar-collapse flex-grow-1 justify-content-end " id="navbarCollapse">
            <div className="navbar-nav poppins-font">
              <Link 
                to="/" 
                className={`nav-item nav-link ${location.pathname === "/" ? "active text-primary" : ""}`}
              >
                Home
              </Link>
              <Link 
                to="/products" 
                className={`nav-item nav-link ${location.pathname === "/products" ? "active text-primary" : ""}`}
              >
                Our Products
              </Link>
              <Link 
                to="/contact" 
                className={`nav-item nav-link ${location.pathname === "/contact" ? "active text-primary" : ""}`}
              >
                Contact
              </Link>
            </div>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default Navbar;
