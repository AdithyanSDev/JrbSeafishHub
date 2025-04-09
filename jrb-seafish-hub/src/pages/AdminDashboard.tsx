import AdminNavbar from '../components/AdminNavbar';
import AdminSidebar from '../components/AdminSidebar';
import '../assets/styles/admin.css';

const AdminDashboard = () => {
  return (
    <div className="admin-container">
      {/* Admin Navbar */}
      <AdminNavbar />

      {/* Sidebar and Main Content Wrapper */}
      <div className="admin-body d-flex">
  <AdminSidebar />

  <div className="main-panel">
          <div className="content-wrapper">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="page-title">Admin Dashboard</h3>
            </div>

            <div className="row">
              <div className="col-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Welcome to the Admin Dashboard</h4>
                    <p className="text-muted">Manage and oversee all system operations from here.</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
