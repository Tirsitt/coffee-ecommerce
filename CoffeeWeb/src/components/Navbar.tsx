import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
   
    return null;
  }

  const { cart } = cartContext;

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Coffee Shop
        </Link>
        
        <div className="d-flex gap-3">
          <Link to="/shop" className="btn btn-outline-light">
            Shop
          </Link>
          <Link to="/cart" className="btn btn-primary position-relative">
            <i className="bi bi-cart"></i>
            {cart.length > 0 && (
              <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                {cart.reduce((total: any, item: { quantity: any; }) => total + item.quantity, 0)}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
}