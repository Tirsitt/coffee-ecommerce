import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import Breadcrumbs from "../components/Breadcrumbs";
import { mockProducts } from "../data/mockProducts";
import type { Product } from "../types/Product";

export default function CategoryPage() {
  const { category } = useParams<{ category: string }>();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API loading
    const timer = setTimeout(() => {
      const categoryProducts = mockProducts.filter(
        (p) => p.category?.toLowerCase() === category?.toLowerCase()
      );
      setFilteredProducts(categoryProducts);
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, [category]);

  return (
    <div className="container mt-3">
      {/* Breadcrumbs */}
      <Breadcrumbs
        paths={[
          { name: "Home", link: "/" },
          { name: category ? category.charAt(0).toUpperCase() + category.slice(1) : "Category" },
        ]}
      />

      {/* Category Header */}
      <div className="mb-4">
        <h2 className="text-capitalize">{category}</h2>
        <p className="text-muted">
          Showing {filteredProducts.length} products
        </p>
      </div>

      {/* Main Content */}
      <div className="row">
        {/* Filters Column */}
        <div className="col-lg-3 mb-4">
          <ProductFilters
            products={mockProducts.filter(
              (p) => p.category?.toLowerCase() === category?.toLowerCase()
            )}
            onFilterChange={setFilteredProducts}
          />
        </div>

        {/* Products Column */}
        <div className="col-lg-9">
          <ProductGrid products={filteredProducts} loading={isLoading} />
        </div>
      </div>
    </div>
  );
}