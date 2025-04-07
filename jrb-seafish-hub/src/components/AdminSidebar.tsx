import { Link, useLocation, useNavigate } from "react-router-dom";
import "../assets/styles/admin.css";
import { useDispatch } from "react-redux";
import { logout } from "../redux/authSlice";

const AdminSidebar = () => {
  const location = useLocation(); // Get current path
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());  // Clear Redux auth state

    // Redirect to home page if there's no token
    navigate("/");
  };

  return (
    <nav className="admin-sidebar">
      <div className="sidebar-collapse">
        <ul className="nav-menu">
          <li className={location.pathname === "/admin/products" ? "active" : ""}>
            <Link to="/admin/products">
              <i className="fa fa-table"></i> Manage Products
            </Link>
          </li>
          <li className={location.pathname === "/admin/categories" ? "active" : ""}>
            <Link to="/admin/categories">
              <i className="fa fa-edit"></i> Manage Categories
            </Link>
          </li>
        </ul>
      </div>

      {/* Logout Button */}
      <div className="logout-section">
        <button className="btn btn-danger logout-btn" onClick={handleLogout}>
          <i className="fa fa-sign-out"></i> Logout
        </button>
      </div>
    </nav>
  );
};

export default AdminSidebar;
