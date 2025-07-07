import { useCart } from "../context/CartContext";

export default function CartItemList() {
  const { cart, removeFromCart, updateQuantity } = useCart();

  return (
    <div className="list-group">
      {cart.map((item) => (
        <div key={item.id} className="list-group-item">
          <div className="row align-items-center">
            <div className="col-md-2">
              <img
                src={item.image}
                alt={item.name}
                className="img-fluid rounded"
                style={{ maxHeight: "80px" }}
              />
            </div>
            <div className="col-md-4">
              <h6 className="mb-1">{item.name}</h6>
              {item.variants && item.variants.length > 0 && (
                <small>
                  Variant: {item.variants.map((variant) => variant.name).join(", ")}
                </small>
              )}
            </div>
            <div className="col-md-3">
              <div className="input-group">
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                >
                  -
                </button>
                <input
                  type="number"
                  className="form-control text-center"
                  value={item.quantity}
                  onChange={(e) =>
                    updateQuantity(item.id, parseInt(e.target.value) || 1)
                  }
                  min="1"
                />
                <button
                  className="btn btn-outline-secondary"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
            <div className="col-md-2 text-end">
              ${(item.price * item.quantity).toFixed(2)}
            </div>
            <div className="col-md-1 text-end">
              <button
                className="btn btn-link text-danger"
                onClick={() => removeFromCart(item.id)}
              >
                <i className="bi bi-trash"></i>
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}