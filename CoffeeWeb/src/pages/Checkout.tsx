import CheckoutSidebar from "../components/CheckoutSidebar/CheckoutSidebar";
import CartItemList from "../components/CartItemList";
import Breadcrumbs from "../components/Breadcrumbs";

export default function Checkout() {
  return (
    <div className="container my-4">
      <Breadcrumbs paths={[
        { name: "Home", link: "/" },
        { name: "Cart", link: "/Cart" },
        { name: "Checkout" }
      ]} />
      
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
