import CheckoutSidebar from "../components/CheckoutSidebar";
import CartItemList from "../components/CartItemList";

export default function Checkout() {
  return (
    <div className="container my-5">
      <h2 className="mb-4">Checkout</h2>

      <div className="row">
        <div className="col-md-8">
          <CartItemList />
        </div>
        <div className="col-md-4">
          <CheckoutSidebar />
        </div>
      </div>
    </div>
  );
}
