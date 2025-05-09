import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

// Define Category Interface
interface Category {
  _id: string;
  name: string;
  image: string;
}

const EditCategory = () => {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);
 

  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories/${id}`);
        const category: Category = response.data;
        setName(category.name);
        console.log("Image from category:", category.image)
        setExistingImage(category.image);
        console.log(setExistingImage(category.image))
      } catch (error) {
        console.error("Error fetching category:", error);
        setError("Failed to load category.");
      }
    };
  
    if (id) {
      fetchCategory();
    }
  }, [id]);
  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    if (!name) {
      setError("Category name is required.");
      return;
    }
  
    if (!token) {
      setError("Authorization token missing!");
      return;
    }
  
    try {
      // Fetch all categories to check for duplicates (excluding the current category)
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
      const isDuplicate = response.data.some(
        (category: any) =>
          category.name.toLowerCase().trim() === name.toLowerCase().trim() && category._id !== id
      );
  
      if (isDuplicate) {
        setError("Another category with this name already exists.");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);
  
      await axios.put(`${import.meta.env.VITE_API_URL}/categories/${id}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          "Authorization": `Bearer ${token}`,
        },
      });
  
      navigate("/admin/categories");
    } catch (err) {
      setError("Error updating category. Please try again.");
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
              <h3 className="page-title">Edit Category</h3>
              {/* Back Button */}+
              
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

                {/* Display Existing Image */}
                <div className="mb-3">
                  <label className="form-label">Current Image</label>
                  {existingImage ? (
  <img
    src={`${import.meta.env.VITE_API_URL.replace("/api", "")}/${existingImage}`}
    alt={`Current image for ${name}`}
    className="category-img"
    style={{ width: "100px", height: "100px", objectFit: "cover", borderRadius: "5px" }}
  />
) : (
  <p className="text-muted">No image available for this category.</p>
)}

                </div>

                <div className="mb-3">
                  <label className="form-label">Upload New Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files ? e.target.files[0] : null)}
                  />
                </div>

                <button type="submit" className="btn btn-primary">Update Category</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCategory;
