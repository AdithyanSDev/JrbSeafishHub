import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../redux/authSlice"; // Import action
import { FaUser, FaLock } from "react-icons/fa";
import axios from "axios";
import "../assets/styles/login.css";

const AdminLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch(); // Redux Dispatch

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    try {
      const response = await axios.post("http://localhost:5000/api/admin/login", {
        email,
        password,
      });
  
      const { token, admin } = response.data; // Extract both token and admin
  
      // Save token & admin in Redux
      dispatch(loginSuccess({ token, admin }));
  
      // Persist in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("admin", JSON.stringify(admin));
  
      navigate("/admin/dashboard", { replace: true });
    } catch (err) {
      setError("Invalid Credentials");
    }
  };
  
  return (
    <div className="limiter">
      <div className="container-login100">
        <div className="wrap-login100">
          <form className="login100-form" onSubmit={handleSubmit}>
            <span className="login100-form-title">Log in</span>
            {error && <p className="text-red-500">{error}</p>}
            <div className="wrap-input100">
              <FaUser className="icon" />
              <input
                className="input100"
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="wrap-input100">
              <FaLock className="icon" />
              <input
                className="input100"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div className="container-login100-form-btn">
              <button className="login100-form-btn" type="submit">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
