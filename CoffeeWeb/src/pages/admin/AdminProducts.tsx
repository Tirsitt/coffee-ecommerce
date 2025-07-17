import { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import ProductFilters from "../../components/ProductFilters";
import Pagination from "../../components/Pagination";
import { mockProducts } from "../../data/mockProducts";
import type { Product } from "../../types/Product";
import { DeleteProduct } from "../../components/DeleteProduct";

export default function AdminProducts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const [resetKey, setResetKey] = useState(0);
  const productsPerPage = 10;

  const [showDeleteProduct, setShowDeleteProduct] = useState(false);
  const [productToDelete, setProductToDelete] = useState<number | null>(null);

  const handleDeleteProduct = async () => {
    if (productToDelete === null) return;

    try {
      console.log('Deleting product:', productToDelete);
      await new Promise(resolve => setTimeout(resolve, 500));
      setFilteredProducts(prev => prev.filter(p => p.id !== productToDelete));
      setShowDeleteProduct(false);
      alert('Product deleted successfully');
    } catch (error) {
      console.error('Failed to delete product:', error);
      alert('Failed to delete product');
    }
  };
  
  const finalProducts = useMemo(() => {
    return filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filteredProducts, searchTerm]);

  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return finalProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, finalProducts]);

  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts, searchTerm]);

    const resetFilters = () => {
        setSearchTerm("");
        setFilteredProducts(mockProducts);
        setResetKey(prev => prev + 1);
    };

  return (
    <div className="container-fluid py-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="mb-0">Manage Products</h2>
        <Link to="/admin/products/new" className="btn btn-primary">
          <i className="bi bi-plus-lg me-1"></i> Add Product
        </Link>
      </div>

      {/* Search Input */}
      <div className="row mb-3">
        <div className="col-md-4">
          <input
            type="text"
            placeholder="Search by product name..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className="row">
        {/* Filters (Left) */}
        <div className="col-md-3">
          <ProductFilters
            key={resetKey}
            products={mockProducts}
            onFilterChange={setFilteredProducts}
          />
        </div>

        {/* Product Table (Right) */}
        <div className="col-md-9">
          {finalProducts.length > 0 ? (
            <>
              <div className="card">
                <div className="card-body p-0">
                  <table className="table table-hover mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>#</th>
                        <th>Name</th>
                        <th>Price</th>
                        <th>Category</th>
                        <th className="text-end">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {currentProducts.map((product, index) => (
                        <tr key={product.id}>
                            <td>{index + 1 + (currentPage - 1) * productsPerPage}</td>
                            <td>{product.name}</td>
                            <td>${product.price}</td>
                            <td>{product.category}</td>
                            <td className="text-end align-middle">
                                <div className="d-flex justify-content-end align-items-center" style={{ height: '100%' }}>
                                    <Link
                                    to={`/admin/products/edit/${product.id}`}
                                    className="btn btn-sm btn-outline-secondary me-2"
                                    >
                                    <i className="bi bi-pencil"></i>
                                    </Link>
                                    <button className="btn btn-sm btn-outline-danger"
                                      onClick={() => {
                                        setProductToDelete(product.id);
                                        setShowDeleteProduct(true);
                                      }}
                                    >
                                      <i className="bi bi-trash"></i>
                                    </button>
                                </div>
                            </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <DeleteProduct
                show={showDeleteProduct}
                onClose={() => setShowDeleteProduct(false)}
                onConfirm={() => {
                  if (productToDelete) handleDeleteProduct();
                  setShowDeleteProduct(false);
                }}
              />

              {/* Pagination */}
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalItems={finalProducts.length}
                  itemsPerPage={productsPerPage}
                  onPageChange={setCurrentPage}
                />
                <div className="text-muted text-center">
                  Showing {currentProducts.length} of {finalProducts.length} products
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <h5>No matching products found</h5>
              <button
                className="btn btn-outline-secondary mt-3"
                onClick={resetFilters}
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
