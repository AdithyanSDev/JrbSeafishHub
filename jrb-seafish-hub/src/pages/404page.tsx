import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="container-fluid py-5">
      <div className="container py-5 text-center">
        <div className="row justify-content-center">
          <div className="col-lg-6">
            <i className="bi bi-exclamation-triangle display-1 text-secondary"></i>
            <h1 className="display-1">404</h1>
            <h1 className="mb-4">Page Not Found</h1>
            <p className="mb-4">
              We’re sorry, the page you have looked for does not exist on our website! 
              Maybe go to our home page or try using the search?
            </p>
            <button
              className="btn border-secondary rounded-pill py-3 px-5"
              onClick={() => navigate("/")}
            >
              Go Back To Home
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
