import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();
  const [formData, setFormData] = useState({
    name: "",
    email: ""
  });
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      // Prepare the order data
      const orderData = {
        customerInfo: {
          name: formData.name,
          email: formData.email
        },
        orderItems: cart.map(item => ({
          productId: item.id,
          name: item.name,
          price: item.price,
          quantity: item.quantity
        })),
        orderTotal: cart.reduce((total, item) => total + (item.price * item.quantity), 0),
        orderDate: new Date().toISOString()
      };

      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) throw new Error("Failed to send order");

      setStatus("success");
      clearCart();
    } catch (err) {
      console.error("Order submission error:", err);
      setStatus("error");
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({ ...prev, [id]: value }));
  };

  return (
    <div className="mt-3 p-3 border rounded bg-white">
      <h6 className="mb-3">Complete Your Order</h6>

      {status === "success" && (
        <div className="alert alert-success">
          ✅ Your order was placed successfully! We'll contact you shortly.
        </div>
      )}

      {status === "error" && (
        <div className="alert alert-danger">
          ❌ Failed to place order. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            required
            id="name"
            className="form-control"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Your Name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email Address</label>
          <input
            required
            id="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={status === "sending" || cart.length === 0}
        >
          {status === "sending" ? "Processing..." : "Place Order"}
        </button>
      </form>
    </div>
  );
}