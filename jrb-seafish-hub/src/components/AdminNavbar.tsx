import { Link } from "react-router-dom";
import "../assets/styles/admin.css"; 

const AdminNavbar = () => {
  return (
    <nav className="navbar default-layout-navbar fixed-top d-flex flex-row">
      <div className="navbar-brand-wrapper d-flex align-items-center">
        <Link className="navbar-brand" to="/admin/dashboard">
         <h3>JRB SEAFISH HUB</h3>
        </Link>
      </div>
     
    </nav>
  );
};

export default AdminNavbar;
