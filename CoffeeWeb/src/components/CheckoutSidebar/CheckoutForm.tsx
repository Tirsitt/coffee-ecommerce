import { useState } from "react";
import { useCart } from "../../context/CartContext";

export default function CheckoutForm() {
  const { cart, clearCart } = useCart();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");

    try {
      const response = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          cart,
        }),
      });

      if (!response.ok) throw new Error("Failed to send order");

      setStatus("success");
      clearCart();
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="mt-3 p-3 border rounded bg-white">
      <h6 className="mb-3">Send Your Order</h6>

      {status === "success" && (
        <div className="alert alert-success">
          ✅ Your order was sent successfully!
        </div>
      )}

      {status === "error" && (
        <div className="alert alert-danger">
          ❌ Something went wrong. Please try again.
        </div>
      )}

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input
            required
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
          />
        </div>

        <button
          type="submit"
          className="btn btn-primary w-100"
          disabled={status === "sending" || cart.length === 0}
        >
          {status === "sending" ? "Sending..." : "Send Order"}
        </button>
      </form>
    </div>
  );
}
