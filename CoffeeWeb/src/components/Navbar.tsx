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
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
           Coffee
        </Link>
        <div className="d-flex">
          <Link to="/cart" className="btn btn-light position-relative">
            🛒 Cart
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