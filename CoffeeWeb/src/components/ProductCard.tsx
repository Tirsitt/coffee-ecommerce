import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import type { Product } from "../types/Product";
import { getFinalPrice } from "../types/Product";

export default function ProductCard({ product }: { product: Product }) {
  const { addToCart } = useCart();
  const finalPrice = getFinalPrice(product);

  return (
    <div className="card h-100 shadow-sm product-card">
      {/* Sale Badge */}
      {product.discountPercentage && (
        <div className="badge bg-danger position-absolute top-0 end-0 m-2">
          {product.discountPercentage}% OFF
        </div>
      )}

      {/* Product Image */}
      <Link to={`/product/${product.id}`}>
        <img
          src={product.image}
          className="card-img-top p-3"
          alt={product.name}
          style={{ height: "200px", objectFit: "contain" }}
          onError={(e) => {
            (e.target as HTMLImageElement).src = '/placeholder-product.png';
          }}
        />
      </Link>

      <div className="card-body d-flex flex-column">
        {/* Category */}
        {product.category && (
          <small className="text-muted text-uppercase mb-1">
            {product.category}
          </small>
        )}

        {/* Product Name */}
        <h5 className="card-title">
          <Link 
            to={`/product/${product.id}`} 
            className="text-decoration-none text-dark"
          >
            {product.name}
          </Link>
        </h5>

        {/* Rating */}
        {product.rating && (
          <div className="mb-2">
            {[...Array(5)].map((_, i) => (
              <i
                key={i}
                className={`bi ${
                  i < Math.floor(product.rating ?? 0)
                    ? "bi-star-fill text-warning"
                    : "bi-star"
                } me-1 small`}
              />
            ))}
            <span className="small text-muted ms-1">
              ({product.rating.toFixed(1)})
            </span>
          </div>
        )}

        {/* Price */}
        <div className="mt-auto">
          {product.discountPercentage ? (
            <div>
              <span className="text-danger h5">
                ${finalPrice.toFixed(2)}
              </span>
              <span className="text-muted text-decoration-line-through ms-2 small">
                ${product.price.toFixed(2)}
              </span>
            </div>
          ) : (
            <span className="h5">${product.price.toFixed(2)}</span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className="btn btn-primary mt-3"
          onClick={() => addToCart(product)}
          disabled={product.stock === 0}
        >
          {product.stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>

      {/* Stock Indicator */}
      {product.stock !== undefined && product.stock > 0 && product.stock <= 10 && (
        <div className="card-footer bg-warning bg-opacity-10 text-center small">
          Only {product.stock} left in stock!
        </div>
      )}
    </div>
  );
}