import { useState, useEffect } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import { mockProducts } from "../data/mockProducts";
import type { Product } from "../types/Product";

export default function EditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Omit<Product, 'id' | 'rating'> & { imageFile?: File | null, imagePreview?: string | null }>({
    name: "",
    price: 0,
    category: "coffee",
    description: "",
    stock: 0,
    image: "",
    imageFile: null,
    imagePreview: null
  });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        setIsLoading(true);
        // Fetch from API
        const product = mockProducts.find(p => p.id === Number(id));
        
        if (!product) {
          throw new Error("Product not found");
        }

        setFormData({
          name: product.name,
          price: product.price,
          category: product.category,
          description: product.description,
          stock: product.stock,
          image: product.image,
          imageFile: null,
          imagePreview: product.image
        });
      } catch (err) {
        setError("Failed to load product");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadProduct();
  }, [id]);

  const categories = [
    { value: "coffee", label: "Coffee" },
    { value: "tea", label: "Tea" }
  ];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          imageFile: file,
          imagePreview: reader.result as string
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    setError("");

    // Validation
    if (!formData.name || !formData.price || !formData.category || !formData.stock) {
      setError("Please fill in all required fields");
      setIsSaving(false);
      return;
    }

    try {
      // Call your API here
      console.log("Updated product data:", {
        ...formData,
        id: Number(id),
        price: Number(formData.price),
        stock: Number(formData.stock)
      });
      
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Redirect after successful update
      navigate("/admin/products", { state: { message: "Product updated successfully!" } });
    } catch (err) {
      setError("Failed to update product. Please try again.");
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="container-fluid py-4">
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-3">Loading product...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container-fluid py-4">
        <div className="alert alert-danger">{error}</div>
        <Link to="/admin/products" className="btn btn-secondary">
          Back to Products
        </Link>
      </div>
    );
  }

  return (
    <div className="container-fluid py-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <div>
          <h2 className="mb-0 d-inline-block">Edit Product</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8 mx-auto">
          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">Product Information</h5>
            </div>
            <div className="card-body">
              {error && (
                <div className="alert alert-danger" role="alert">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label htmlFor="name" className="form-label">Product Name *</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="category" className="form-label">Category *</label>
                    <select
                      className="form-select"
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                    >
                      {categories.map(cat => (
                        <option key={cat.value} value={cat.value}>{cat.label}</option>
                      ))}
                    </select>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="price" className="form-label">Price *</label>
                    <div className="input-group">
                      <span className="input-group-text">$</span>
                      <input
                        type="number"
                        className="form-control"
                        id="price"
                        name="price"
                        min="0"
                        step="0.01"
                        value={formData.price}
                        onChange={handleChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="col-md-6 mb-3">
                    <label htmlFor="stock" className="form-label">Stock Quantity *</label>
                    <input
                      type="number"
                      className="form-control"
                      id="stock"
                      name="stock"
                      min="0"
                      value={formData.stock}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="col-12 mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                      className="form-control"
                      id="description"
                      name="description"
                      rows={4}
                      value={formData.description}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="col-12 mb-4">
                    <label htmlFor="image" className="form-label">Product Image</label>
                    <div className="border rounded p-3">
                      {formData.imagePreview ? (
                        <div className="text-center">
                            <div className="mb-3">
                                <img 
                                    src={formData.imagePreview} 
                                    alt="Preview" 
                                    className="img-fluid mb-3 rounded" 
                                    style={{ maxHeight: '200px' }}
                                />
                            </div>
                          <label className="btn btn-outline-primary">
                            <i className="bi bi-upload me-1"></i> Change Image
                            <input
                              type="file"
                              id="image"
                              name="image"
                              className="d-none"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </label>
                        </div>
                      ) : (
                        <div className="text-center">
                          <div className="mb-3 p-5 bg-light rounded">
                            <i className="bi bi-upload text-muted" style={{ fontSize: '1.5rem' }}></i>
                            <p className="mt-2 mb-0 text-muted">No image selected</p>
                          </div>
                          <label className="btn btn-primary">
                            <i className="bi bi-upload me-1"></i> Upload Image
                            <input
                              type="file"
                              id="image"
                              name="image"
                              className="d-none"
                              onChange={handleImageChange}
                              accept="image/*"
                            />
                          </label>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="col-12">
                    <div className="d-flex justify-content-end gap-2">
                      <button 
                        type="button" 
                        className="btn btn-outline-secondary"
                        onClick={() => navigate("/admin/products")}
                      >
                        Cancel
                      </button>
                      <button 
                        type="submit" 
                        className="btn btn-primary"
                        disabled={isSaving}
                      >
                        {isSaving ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-1" role="status"></span>
                            Saving...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-save me-1"></i> Save Changes
                          </>
                        )}
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}