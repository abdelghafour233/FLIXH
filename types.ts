
export interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  stock: number;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface StoreStats {
  revenue: number;
  sales: number;
  orders: number;
  data: { name: string; sales: number }[];
}

export type AppView = 'store' | 'admin' | 'checkout';
