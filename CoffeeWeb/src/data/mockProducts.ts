import type { Product } from "../types/Product";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Colombia Dark Roast",
    price: 12.99,
    image: "coffee-image.jpg",
    description: "Rich chocolate notes with full body",
    stock: 50,
    rating: 4.5,
    category: "coffee"
  },
  {
    id: 2,
    name: "Ethiopia Light Roast",
    price: 14.99,
    image: "https://images.unsplash.com/photo-1459755486867-b55449bb39ff?w=300",
  },
];
