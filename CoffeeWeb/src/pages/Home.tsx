import { Link } from "react-router-dom";
import { mockProducts } from "../data/mockProducts";
import ProductCard from "../components/ProductCard";

export default function Home() {
  const featuredProducts = mockProducts.slice(0, 3); // Show only 3 featured products

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="display-4 mb-3">Welcome to Coffee</h1>
        <p className="lead text-muted">
          Discover our premium selection of coffee blends
        </p>
        <Link to="/shop" className="btn btn-primary btn-lg mt-3">
          Explore All Products
        </Link>
      </div>

      <h2 className="text-center mb-4">Featured Products</h2>
      <div className="row row-cols-1 row-cols-md-3 g-4">
        {featuredProducts.map((product) => (
          <div key={product.id} className="col">
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}