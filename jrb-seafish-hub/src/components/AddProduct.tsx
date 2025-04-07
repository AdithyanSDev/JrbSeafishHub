import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";
// Define Category Type
interface Category {
  _id: string;
  name: string;
}

const AddProduct = () => {
  const [name, setName] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [category, setCategory] = useState("");
  const [categories, setCategories] =  useState<Category[]>([])
  const [price, setPrice] = useState<number | "">("");
  const [stockStatus, setStockStatus] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_API_URL}/categories`);
        setCategories(response.data);
        
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const formData = new FormData();
      formData.append("name", name);
      if (image) formData.append("image", image);
      formData.append("category", category);
      formData.append("price", price.toString());
      formData.append("stockStatus", stockStatus.toString());
console.log(formData)
      await axios.post(`${import.meta.env.VITE_API_URL}/products`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      navigate("/admin/products");
    } catch (err) {
      setError("Error adding product. Please try again.");
    }
  };

  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-body">
        <AdminSidebar />
        <div className="main-panel">
          <div className="content-wrapper">
            <div className="d-flex justify-content-between align-items-center mb-3">
              <h3 className="page-title">Add New Product</h3>
              <button className="btn btn-secondary" onClick={() => navigate("/admin/products")}>
                ← Back to Products
              </button>
            </div>

            {error && <p className="text-danger">{error}</p>}
            <div className="card p-4">
              <form onSubmit={handleSubmit} encType="multipart/form-data">
                <div className="mb-3">
                  <label className="form-label">Product Name</label>
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

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
  className="form-control"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  required
>
  <option value="">Select a category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat._id}> {/* Use _id as the value */}
      {cat.name}
    </option>
  ))}
</select>

                </div>

                <div className="mb-3">
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(e.target.value ? Number(e.target.value) : "")}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Stock Status</label>
                  <select
                    className="form-control"
                    value={stockStatus.toString()}
                    onChange={(e) => setStockStatus(e.target.value === "true")}
                    required
                  >
                    <option value="true">In Stock</option>
                    <option value="false">Out of Stock</option>
                  </select>
                </div>

                <button type="submit" className="btn btn-primary">
                  Add Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
