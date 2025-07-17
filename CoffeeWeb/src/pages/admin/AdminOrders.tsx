import { useState } from "react";
import { mockOrders } from "../../data/mockOrders";
import type { OrderStatus } from "../../types/Order";

export default function AdminOrders() {
  // Fetch orders from API
  const [orders, setOrders] = useState(mockOrders);

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    setOrders(orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
  };

  return (
    <div className="container-fluid py-4">
      {/* Table displaying orders */}
      <div className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Customer</th>
            <th>Date</th>
            <th>Total</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {orders.map(order => (
            <tr key={order.id}>
              <td>{order.id}</td>
              <td>
                <div>{order.customerName}</div>
                <small>{order.email}</small>
              </td>
              <td>{new Date(order.date).toLocaleDateString()}</td>
              <td>${order.total.toFixed(2)}</td>
              <td>
                <select
                  value={order.status}
                  onChange={(e) => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                >
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="shipped">Shipped</option>
                  <option value="completed">Completed</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </td>
              <td>
                <button className="btn btn-sm btn-primary">
                  View Details
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    </div>
  );
}