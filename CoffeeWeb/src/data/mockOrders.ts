import type { AdminOrder } from '../types/Order';

export const mockOrders: AdminOrder[] = [
  {
    id: 'ORD-1001',
    customerName: 'John Smith',
    email: 'john@example.com',
    date: new Date().toISOString(),
    status: 'pending',
    total: 125.99,
    cartItems: [
      {
        productId: '1',
        name: 'Espresso Blend',
        price: 9.99,
        quantity: 2
      },
      {
        productId: '2',
        name: 'Coffee Mug',
        price: 12.99,
        quantity: 1
      }
    ]
  }
];