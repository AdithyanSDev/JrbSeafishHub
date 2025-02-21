import React from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar: React.FC = () => {
  const location = useLocation();

  return (
    <div className="container-fluid fixed-top">
      <div className="container topbar bg-primary d-none d-lg-block">
        <div className="d-flex justify-content-between">
          <div className="top-info ps-2">
            <small className="me-3">
              <i className="fas fa-map-marker-alt me-2 text-secondary"></i>
              <a href="#" className="text-white">
                No.1 Naveen Complex, Ward No.22, Budigere Road, Devanahalli Town, Bangalore - 562110, Karnataka
              </a>
            </small>
            <small className="me-3">
              <i className="fas fa-envelope me-2 text-secondary"></i>
              <a href="#" className="text-white">seafish.jrb@gmail.com</a>
            </small>
          </div>
        </div>
      </div>

      <div className="container px-0">
        <nav className="navbar navbar-light bg-white navbar-expand-xl">
          <Link to="/" className="navbar-brand">
            <h1 className="text-primary display-6">JRB Seafish Hub</h1>
          </Link>
          <button
            className="navbar-toggler py-2 px-3"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarCollapse"
          >
            <span className="fa fa-bars text-primary"></span>
          </button>
          <div className="collapse navbar-collapse bg-white" id="navbarCollapse">
            <div className="navbar-nav mx-auto">
              <Link to="/" className={`nav-item nav-link ${location.pathname === "/" ? "active" : ""}`}>
                Home
              </Link>
              <Link to="/products" className={`nav-item nav-link ${location.pathname === "/products" ? "active" : ""}`}>
                Our Products
              </Link>
              <Link to="/contact" className={`nav-item nav-link ${location.pathname === "/contact" ? "active" : ""}`}>
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
