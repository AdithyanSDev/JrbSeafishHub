import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import "../assets/styles/admin.css";
import AdminSidebar from "../components/AdminSidebar";
import AdminNavbar from "../components/AdminNavbar";

interface Category {
  _id: string;
  name: string;
  image: string;
}

const CategoryManagement = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const token =
    useSelector((state: any) => state.auth.token) ||
    localStorage.getItem("token");
  console.log(token);
console.log(categories)
  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}/categories`
      );
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError("Failed to load categories.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this category?"))
      return;

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/categories/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      setCategories(categories.filter((category) => category._id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
      setError("Failed to delete category.");
    }
  };

  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-body d-flex">
  <AdminSidebar />

  <div className="main-panel">
          <div className="content-wrapper">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="page-title">Category Management</h3>
              <Link to="/admin/add-category" className="btn btn-primary">
                + Add Category
              </Link>
            </div>

            {error && <p className="text-danger">{error}</p>}

            <div className="row">
              <div className="col-12 grid-margin">
                <div className="card">
                  <div className="card-body">
                    <h4 className="card-title">Categories List</h4>
                    <div className="table-responsive">
                      {loading ? (
                        <p>Loading categories...</p>
                      ) : categories.length === 0 ? (
                        <p className="text-center text-muted">
                          No categories available
                        </p>
                      ) : (
                        <table className="table">
                          <thead>
                            <tr>
                              <th>Image</th>
                              <th>Name</th>
                              <th>Actions</th>
                            </tr>
                          </thead>
                          <tbody>
                            {categories.map((category) => (
                              <tr key={category._id}>
                                <td>
                                  <img
                                    src={`uploads/${
                                      category.image
                                    }`}
                                    alt={category.name}
                                    className="category-img"
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      objectFit: "cover",
                                      borderRadius: "50%", // Makes the image circular
                                      border: "2px solid #ddd", 
                                    }}
                                  />
                                </td>

                                <td>{category.name}</td>
                                <td>
                                  <Link
                                    to={`/admin/edit-category/${category._id}`}
                                    className="btn btn-sm btn-info"
                                  >
                                    Edit
                                  </Link>

                                  <button
                                    className="btn btn-sm btn-danger ms-2"
                                    onClick={() => handleDelete(category._id)}
                                  >
                                    Delete
                                  </button>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>
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

export default CategoryManagement;
