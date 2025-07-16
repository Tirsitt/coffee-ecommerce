import { useParams, Link, Navigate } from "react-router-dom";
import { mockProducts } from "../data/mockProducts";
import { useCart } from "../context/CartContext";
import Breadcrumbs from "../components/Breadcrumbs";

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const { addToCart } = useCart();
  const product = mockProducts.find(p => p.id === Number(id));

  if (!product) {
    return <Navigate to="/404" replace />;
  }

  return (
    <div className="container mt-4">
      <Breadcrumbs paths={[
        { name: "Home", link: "/" },
        { name: "Shop", link: "/Shop" },
        { name: product.name }
      ]} />
                  
      {/* Back Navigation */}
      <Link to="/Shop" className="btn btn-outline-secondary mb-4">
        ← Continue Shopping
      </Link>

      {/* Product Content */}
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100">
            <img 
              src={product.image} 
              className="card-img-top p-4" 
              alt={product.name}
              style={{ objectFit: 'contain', height: '400px' }}
            />
          </div>
        </div>
        
        <div className="col-md-6">
          <h1 className="mb-3">{product.name}</h1>
          <p className="h3 text-primary mb-4">${product.price.toFixed(2)}</p>
          
          {product.description && (
            <div className="mb-4">
              <h5>Description</h5>
              <p>{product.description}</p>
            </div>
          )}

          <div className="d-flex gap-3 mb-4">
            <button 
              className="btn btn-primary btn-lg flex-grow-1"
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>

          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Product Details</h5>
              <ul className="list-unstyled">
                <li><strong>SKU:</strong> {product.id}</li>
                {product.stock && (
                  <li><strong>Availability:</strong> {product.stock > 0 ? 'In Stock' : 'Out of Stock'}</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}