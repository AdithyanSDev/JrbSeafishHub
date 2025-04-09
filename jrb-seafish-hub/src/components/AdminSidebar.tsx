import  { useState } from 'react';
import { Offcanvas, Button, Nav } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import '../assets/styles/admin.css';

const AdminSidebar = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* Toggle Button for Mobile */}
      <Button variant="primary" onClick={handleShow} className="d-lg-none m-2">
        <i className="fas fa-bars"></i>
      </Button>

      {/* Mobile Offcanvas Sidebar */}
      <Offcanvas show={show} onHide={handleClose} responsive="lg" className="d-lg-none">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>Admin Panel</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column justify-between h-100">
          <Nav className="flex-column flex-grow-1">
            <Nav.Link as={Link} to="/admin/products">📦 Manage Products</Nav.Link>
            <Nav.Link as={Link} to="/admin/categories">📁 Manage Categories</Nav.Link>
          </Nav>
          <div className="logout-btn-wrapper">
            <Button variant="danger" className="w-100">Logout</Button>
          </div>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Static Sidebar for Large Screens */}
      <div className="admin-sidebar d-none d-lg-flex flex-column justify-between">
        <div>
          <h5 className="text-center p-3">Admin Panel</h5>
          <Nav className="flex-column px-3">
            <Nav.Link as={Link} to="/admin/products">📦 Manage Products</Nav.Link>
            <Nav.Link as={Link} to="/admin/categories">📁 Manage Categories</Nav.Link>
          </Nav>
        </div>
        <div className="logout-btn-wrapper p-3">
          <Button variant="danger" className="w-100">Logout</Button>
        </div>
      </div>
    </>
  );
};

export default AdminSidebar;
