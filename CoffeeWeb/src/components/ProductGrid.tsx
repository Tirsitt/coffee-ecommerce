import type { Product } from "../types/Product";
import ProductCard from "./ProductCard";
import EmptyState from "./EmptyState";
type Props = {
  products: Product[];
  loading?: boolean;
};

export default function ProductGrid({ products, loading }: Props) {
  if (loading) {
    return (
      <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
        {[...Array(6)].map((_, i) => (
          <div key={i} className="col">
            <div className="card h-100 placeholder-glow">
              <div className="placeholder card-img-top" style={{ height: "200px" }} />
              <div className="card-body">
                <h5 className="card-title placeholder col-8"></h5>
                <p className="card-text placeholder col-6"></p>
                <button className="btn btn-primary disabled placeholder col-12"></button>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return <EmptyState 
      title="No products found"
      description="Try adjusting your filters"
      icon="bi-emoji-frown"
    />;
  }

  return (
    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
      {products.map((product) => (
        <div key={product.id} className="col">
          <ProductCard product={product} />
        </div>
      ))}
    </div>
  );
}