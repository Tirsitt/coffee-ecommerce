import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const cartContext = useContext(CartContext);
  const { user, logout } = useAuth();

  if (!cartContext) {
    return null;
  }

  const { cart, clearCart } = cartContext;

  const handleLogout = () => {
    logout();
    clearCart();
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Coffee Shop
        </Link>
        
        <div className="d-flex align-items-center gap-3">
          {/* Always show Shop link */}
          <Link to="/shop" className="btn btn-outline-light">
            Shop
          </Link>
          
          {/* Always show Cart */}
          <Link to="/cart" className="btn btn-outline-light position-relative">
            <i className="bi bi-cart"></i>
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.reduce((total, item) => total + item.quantity, 0)}
              </span>
            )}
          </Link>

          {/* Conditional auth buttons */}
          {user ? (
            <button onClick={handleLogout} className="btn btn-primary">
              Logout
            </button>
          ) : (
            <>
              <Link to="/login" className="btn btn-outline-light">
                Login
              </Link>
              <Link to="/signup" className="btn btn-primary">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}