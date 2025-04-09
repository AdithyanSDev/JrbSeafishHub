import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

const AddCategory = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null); // Updated for File Upload
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    if (!name || !image) {
      setError("Please fill in all required fields.");
      return;
    }
  
    try {
      // Check if category with the same name exists
      const existing = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      const isDuplicate = existing.data.some(
        (category: any) => category.name.toLowerCase().trim() === name.toLowerCase().trim()
      );
  
      if (isDuplicate) {
        setError("Category with this name already exists.");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);
  
      await axios.post(`${import.meta.env.VITE_API_URL}/categories`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
  
      navigate("/admin/categories");
    } catch (err) {
      setError("Error adding category. Please try again.");
    }
  };
  
  return (
    <div className="admin-container">
      {/* Admin Navbar */}
      <AdminNavbar />

      <div className="admin-body d-flex">
        <AdminSidebar />

        {/* Main Panel */}
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="page-title">Add New Category</h3>
              {/* Back Button */}
              <button className="btn btn-secondary" onClick={() => navigate("/admin/categories")}>
                ← Back to Categories
              </button>
            </div>

            {error && <p className="text-danger">{error}</p>}
            <div className="card p-4">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label className="form-label">Category Name</label>
                  <input
                    type="text"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">Add Category</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCategory;
