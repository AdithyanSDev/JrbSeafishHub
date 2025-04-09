import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../redux/store";
import axios from "axios";
import AdminNavbar from "../components/AdminNavbar";
import AdminSidebar from "../components/AdminSidebar";

interface Product {
  _id: string;
  name: string;
  price: number;
  category: string;
  stockStatus: boolean; // Changed to boolean
  image: string;
}

interface Category {
  _id: string;
  name: string;
}

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const [name, setName] = useState("");
  const [price, setPrice] = useState(0);
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [stockStatus, setStockStatus] = useState<boolean>(true); 

  const [image, setImage] = useState<File | null>(null);
  const [existingImage, setExistingImage] = useState("");
  const [error, setError] = useState("");
  

  useEffect(() => {
    const fetchProductAndCategories = async () => {
      try {
        const [productRes, categoryRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/products/${id}`),
          axios.get(`${import.meta.env.VITE_API_URL}/categories`),
        ]);

        const product: Product = productRes.data;
        setName(product.name);
        setPrice(product.price);
        setCategory(
          product.category && typeof product.category === "object" && "name" in product.category
            ? (product.category as Category)._id
            : product.category || ""
        );
        
        
        setStockStatus(product.stockStatus); // boolean
        setExistingImage(product.image);
        setCategories(categoryRes.data);
      } catch (error) {
        setError("Failed to load product or categories.");
      }
    };

    if (id) {
      fetchProductAndCategories();
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
  
    if (!token) {
      setError("Authorization token missing!");
      return;
    }
  
    if (!name || !category || !price) {
      setError("Please fill in all required fields.");
      return;
    }
  
    try {
      // Fetch existing products
      const existing = await axios.get(`${import.meta.env.VITE_API_URL}/products`);
      const isDuplicate = existing.data.some(
        (product: any) =>
          product._id !== id &&
          product.name.toLowerCase().trim() === name.toLowerCase().trim()
      );
  
      if (isDuplicate) {
        setError("Product with this name already exists.");
        return;
      }
  
      const formData = new FormData();
      formData.append("name", name);
      formData.append("price", price.toString());
      formData.append("category", category);
      formData.append("stockStatus", stockStatus.toString());
      if (image) formData.append("image", image);
  
      await axios.put(
        `${import.meta.env.VITE_API_URL}/products/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );
  
      navigate("/admin/products");
    } catch (err: any) {
      if (axios.isAxiosError(err)) {
        const msg =
          err.response?.data?.message || "Error updating product. Please try again.";
        setError(msg);
      } else {
        setError("Error updating product. Please try again.");
      }
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
              <h3 className="page-title">Edit Product</h3>
              <button
                className="btn btn-secondary"
                onClick={() => navigate("/admin/products")}
              >
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
                  <label className="form-label">Price</label>
                  <input
                    type="number"
                    className="form-control"
                    value={price}
                    onChange={(e) => setPrice(parseFloat(e.target.value))}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Category</label>
                  <select
  className="form-control"
  value={category}
  onChange={(e) => setCategory(e.target.value)}
>
  <option value="">Select a category</option>
  {categories.map((cat) => (
    <option key={cat._id} value={cat._id}>
      {cat.name}
    </option>
  ))}
</select>

                </div>

                <div className="mb-3">
  <label className="form-label">Stock Status</label>
  <select
    className="form-control"
    value={stockStatus?.toString() || "false"}
    onChange={(e) => setStockStatus(e.target.value === "true")}
    required
  >
    <option value="true">In Stock</option>
    <option value="false">Out of Stock</option>
  </select>
</div>



                <div className="mb-3">
                  <label className="form-label">Current Image</label>
                  {existingImage && (
                    <img
                      src={`${import.meta.env.VITE_API_URL.replace(
                        "/api",
                        ""
                      )}${existingImage}`}
                      alt="Product"
                      className="product-img"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "5px",
                      }}
                    />
                  )}
                </div>

                <div className="mb-3">
                  <label className="form-label">Upload New Image</label>
                  <input
                    type="file"
                    className="form-control"
                    accept="image/*"
                    onChange={(e) =>
                      setImage(e.target.files ? e.target.files[0] : null)
                    }
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Update Product
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProduct;
