import { useState, useMemo, useEffect } from "react";
import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import Breadcrumbs from "../components/Breadcrumbs";
import Pagination from "../components/Pagination";
import { mockProducts } from "../data/mockProducts";
import type { Product } from "../types/Product";

export default function Shop() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  // Combine both search and filters
  const finalProducts = useMemo(() => {
    return filteredProducts.filter(product =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [filteredProducts, searchTerm]);

  // Get current products for pagination
  const currentProducts = useMemo(() => {
    const indexOfLastProduct = currentPage * productsPerPage;
    const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
    return finalProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  }, [currentPage, finalProducts]);

  // Reset to first page when filters or search change
  useEffect(() => {
    setCurrentPage(1);
  }, [filteredProducts, searchTerm]);

  return (
    <div className="container mt-4">
      <Breadcrumbs paths={[
        { name: "Home", link: "/" },
        { name: "Shop" }
      ]} />
      
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1>Our Products</h1>
        {/* Search Bar */}
        <div className="w-25">
          <input
            type="text"
            placeholder="Search products..."
            className="form-control"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      
      <div className="row">
        {/* Filters Column */}
        <div className="col-md-3">
          <ProductFilters 
            products={mockProducts}
            onFilterChange={setFilteredProducts}
          />
        </div>

        {/* Products Column */}
        <div className="col-md-9">
          {finalProducts.length > 0 ? (
            <>
              <ProductGrid products={currentProducts} />
              
              {/* Pagination */}
              <div className="mt-4">
                <Pagination
                  currentPage={currentPage}
                  totalItems={finalProducts.length}
                  itemsPerPage={productsPerPage}
                  onPageChange={setCurrentPage}
                />
                <div className="text-center text-muted mt-2">
                  Showing {currentProducts.length} of {finalProducts.length} products
                </div>
              </div>
            </>
          ) : (
            <div className="text-center py-5">
              <h4>No products found</h4>
              <p className="text-muted">
                {searchTerm ? 
                  `No matches for "${searchTerm}"` : 
                  "Try adjusting your filters"
                }
              </p>
              <button 
                className="btn btn-outline-primary"
                onClick={() => {
                  setSearchTerm("");
                  setFilteredProducts(mockProducts);
                }}
              >
                <i className="fas fa-redo me-2"></i>Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}