export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  images?: string[];
  description?: string;
  stock?: number;
  category?: string;
  rating?: number;
  reviewCount?: number;
  discountPercentage?: number;
  variants?: {
    id: number;
    name: string;
    priceAdjustment?: number;
  }[];
  specifications?: {
    key: string;
    value: string;
  }[];
  isFeatured?: boolean;
  createdAt?: Date;
}

export function isProduct(obj: any): obj is Product {
  return (
    obj && 
    typeof obj.id === 'number' && 
    typeof obj.name === 'string' && 
    typeof obj.price === 'number' &&
    typeof obj.image === 'string'
  );
}

/**
 * Gets the final price after discounts
 */
export function getFinalPrice(product: Product): number {
  return product.discountPercentage
    ? product.price * (1 - product.discountPercentage / 100)
    : product.price;
}