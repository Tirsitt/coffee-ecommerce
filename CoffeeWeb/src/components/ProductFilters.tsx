import { useEffect, useState } from "react";
import type { Product } from "../types/Product";

type Props = {
  products: Product[];
  onFilterChange: (filtered: Product[]) => void;
};

export default function ProductFilters({ products, onFilterChange }: Props) {
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 100]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  // Extract unique categories (filter out undefined)
  const allCategories: string[] = [...new Set(products.map(p => p.category))].filter((c): c is string => typeof c === "string");

  useEffect(() => {
    const filtered = products.filter(product => {
      // Price filter
      const withinPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      
      // Category filter
      const matchesCategory = selectedCategories.length === 0 || 
        (product.category && selectedCategories.includes(product.category));
      
      return withinPrice && matchesCategory;
    });

    onFilterChange(filtered);
  }, [priceRange, selectedCategories, products, onFilterChange]);

  return (
    <div className="card mb-4 sticky-top" style={{ top: "20px" }}>
      <div className="card-body">
        <h5 className="card-title">Filters</h5>
        
        {/* Price Filter */}
        <div className="mb-4">
          <label className="form-label">
            Price: ${priceRange[0]} - ${priceRange[1]}
          </label>
          <input
            type="range"
            className="form-range"
            min="0"
            max="100"
            value={priceRange[1]}
            onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
          />
        </div>

        {/* Category Filter */}
        {allCategories.length > 0 && (
          <div className="mb-3">
            <h6>Categories</h6>
            {allCategories.map(category => (
              <div key={category} className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id={`cat-${category}`}
                  checked={selectedCategories.includes(category)}
                  onChange={(e) => {
                    if (e.target.checked) {
                      setSelectedCategories([...selectedCategories, category]);
                    } else {
                      setSelectedCategories(selectedCategories.filter(c => c !== category));
                    }
                  }}
                />
                <label className="form-check-label" htmlFor={`cat-${category}`}>
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}