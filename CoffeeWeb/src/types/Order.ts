// types/Order.ts

// What the USER submits
export interface OrderSubmission {
  customerName: string;
  email: string;
  cartItems: CartItem[];
  total: number;
}

// What the ADMIN sees (extends user submission)
export interface AdminOrder extends OrderSubmission {
  id: string;
  date: string;
  status: OrderStatus;
  // Admin-only fields can be added here
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'completed' | 'cancelled';