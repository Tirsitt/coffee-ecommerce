import CartSummary from "./CartSummary";

export default function CheckoutSidebar() {
  return (
    <div className="position-sticky" style={{ top: "20px" }}>
      <CartSummary showCheckoutButton={false} />
      <div className="mt-3 p-3 border rounded">
        <h6 className="mb-3">Secure Checkout</h6>
        <img
          src="/payment-methods.png"
          alt="Accepted payment methods"
          className="img-fluid"
        />
      </div>
    </div>
  );
}
