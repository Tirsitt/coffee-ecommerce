import { useContext } from "react";
import { CartContext } from "../context/CartContext";
import { Link } from "react-router-dom";
import CartSummary from "../components/CartSummary";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Cart() {
  const cartContext = useContext(CartContext);
  const cart = cartContext?.cart || [];

  return (
    <div className="container mt-4">
      <Breadcrumbs paths={[
        { name: "Home", link: "/" },
        { name: "Cart" }
      ]} />

      <h1 className="mb-4">Your Cart</h1>

      {cart.length === 0 ? (
        <div className="text-center">
          <p>Your cart is empty.</p>
          <Link to="/" className="btn btn-primary">
            Shop Now
          </Link>
        </div>
      ) : (
        <>
          {/* Product List */}
          <div className="row">
            {cart.map((item) => (
              <div key={item.id} className="col-md-4 mb-4">
                <div className="card">
                  <div className="card-body">
                    <h5 className="card-title">{item.name}</h5>
                    <p>Price: ${item.price.toFixed(2)}</p>
                    <p>Quantity: {item.quantity}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary - show under the cart items */}
          <div className="row justify-content-center mt-4">
            <div className="col-md-6">
              <CartSummary />
            </div>
          </div>
        </>
      )}
    </div>
  );
}
