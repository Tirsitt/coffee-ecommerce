import CartSummary from "../CartSummary";
import CheckoutForm from "./CheckoutForm";

export default function CheckoutSidebar() {
  return (
    <div className="position-sticky" style={{ top: "20px" }}>
      <CartSummary showCheckoutButton={false} />
      <CheckoutForm />
    </div>
  );
}