  import { useState, useEffect } from "react";
  import { Link } from "react-router-dom";
  import axios from "axios";

  import "../assets/styles/admin.css";
  import AdminNavbar from "../components/AdminNavbar";
  import AdminSidebar from "../components/AdminSidebar";
import { useSelector } from "react-redux";


interface Category {
  _id: string;
  name: string;
  image: string;
}
  interface Product {
    _id: string;
    name: string;
    price: number;
    category: Category;
      stockStatus: boolean;
  }

  const ProductManagement = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const token = useSelector((state: any) => state.auth.token);

    useEffect(() => {
      const fetchProducts = async () => {
        try {
          const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
            headers: {
              Authorization: `Bearer ${token}`, // Include token in GET request
            },
          });
          console.log("Fetched Products:", response.data);
          setProducts(response.data);
        } catch (error) {
          console.error("Error fetching products:", error);
        } finally {
          setLoading(false);
        }
      };
  
      fetchProducts();
    }, [token]);
  
    const handleDelete = async (id: string) => {
      const confirmDelete = window.confirm("Are you sure you want to delete this product?");
      if (!confirmDelete) return;
  
      if (!token) {
        alert("Unauthorized - No token found");
        return;
      }
  
      try {
        await axios.delete(`${import.meta.env.VITE_API_URL}/products/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`, 
          },
        });
        alert("Product deleted successfully");
        setProducts(products.filter((product) => product._id !== id));
      } catch (error) {
        console.error("Error deleting product:", error);
        alert("Failed to delete the product");
      }
    };
  
  

    return (
      <div className="admin-container">
        {/* Admin Navbar */}
        <AdminNavbar />

        {/* Sidebar and Main Content Wrapper */}
        <div className="admin-body">
          <AdminSidebar />
          
          <div className="main-panel">
            <div className="content-wrapper">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h3 className="page-title">Product Management</h3>
                <Link to="/admin/add-product" className="btn btn-primary">
                  + Add Product
                </Link>
              </div>

              <div className="row">
                <div className="col-12 grid-margin">
                  <div className="card">
                    <div className="card-body">
                      <h4 className="card-title">Product Inventory</h4>
                      <div className="table-responsive">
                        {loading ? (
                          <p>Loading products...</p>
                        ) : products.length === 0 ? (
                          <p className="text-center text-muted">No products in the inventory</p>
                        ) : (
                          <table className="table">
                            <thead>
                              <tr>
                                <th>Name</th>
                                <th>Category</th>
                                <th>Price</th>
                                <th>Stock</th>
                                <th>Actions</th>
                              </tr>
                            </thead>
                            <tbody>
    {products.map((product, index) => (
      <tr key={index}>
        <td>{product.name}</td>
        <td>{product.category?.name || "Unknown"}</td>
        <td>₹{product.price.toFixed(2)}</td>
        <td>{product.stockStatus}</td>
        <td>
        <Link to={`/admin/edit-product/${product._id}`} className="btn btn-sm btn-info">
    Edit
  </Link>

  <button 
                                    className="btn btn-sm btn-danger ms-2" 
                                    onClick={() => handleDelete(product._id)}
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

  export default ProductManagement;
