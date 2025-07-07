// src/components/CartSummary.tsx
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { getFinalPrice } from "../types/Product";

export default function CartSummary({ showCheckoutButton = true }: { showCheckoutButton?: boolean }) {
  const { cart, clearCart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + getFinalPrice(item) * item.quantity,
    0
  );

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  // Optional: Calculate taxes (example 10%)
  const taxRate = 0.1;
  const tax = subtotal * taxRate;
  const total = subtotal + tax;

  return (
    <div className="card shadow-sm">
      <div className="card-header bg-light">
        <h5 className="mb-0">Order Summary</h5>
      </div>
      <div className="card-body">
        {/* Items Count */}
        <div className="d-flex justify-content-between mb-3">
          <span>Items ({totalItems}):</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>

        {/* Tax */}
        <div className="d-flex justify-content-between mb-3 small text-muted">
          <span>Tax (10%):</span>
          <span>${tax.toFixed(2)}</span>
        </div>

        {/* Divider */}
        <hr className="my-3" />

        {/* Total */}
        <div className="d-flex justify-content-between fw-bold mb-4">
          <span>Total:</span>
          <span>${total.toFixed(2)}</span>
        </div>

        {/* Checkout Button */}
        {showCheckoutButton && (
          cart.length === 0 ? (
            <button className="btn btn-primary w-100 mb-3" disabled>
              Proceed to Checkout
            </button>
          ) : (
            <Link
              to="/checkout"
              className="btn btn-primary w-100 mb-3"
            >
              Proceed to Checkout
            </Link>
          )
        )}

        {/* Continue Shopping */}
        <Link to="/" className="btn btn-outline-secondary w-100 mb-3">
          Continue Shopping
        </Link>

        {/* Clear Cart (only show if cart has items) */}
        {cart.length > 0 && (
          <button
            onClick={clearCart}
            className="btn btn-link text-danger w-100"
          >
            Clear Cart
          </button>
        )}
      </div>
    </div>
  );
}