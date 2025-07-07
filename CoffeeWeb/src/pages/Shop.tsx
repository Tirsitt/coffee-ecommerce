import { useState } from "react";
import ProductFilters from "../components/ProductFilters";
import ProductGrid from "../components/ProductGrid";
import { mockProducts } from "../data/products";
import type { Product } from "../types/Product";

export default function Shop() {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(mockProducts);

  return (
    <div className="container mt-4">
      <div className="row">
        {/* Filters Column - Left Side */}
        <div className="col-md-3">
          <ProductFilters 
            products={mockProducts}
            onFilterChange={(filtered) => setFilteredProducts(filtered)}
          />
        </div>

        {/* Products Column - Right Side */}
        <div className="col-md-9">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
}