export interface ProductImage {
  url: string;
  alt?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  shortDescription: string;
  description?: unknown;
  ingredients?: Array<{ ingredient: string }>;
  usageMode?: string;
  warnings?: string;
  batch?: string;
  expirationDate?: string;
  price: number;
  stock: number;
  images?: Array<{ image: ProductImage }>;
  isFeatured?: boolean;
  isNatural?: boolean;
  isExternalUse?: boolean;
  isIndigenousFormula?: boolean;
  category?: {
    id: string;
    name: string;
    slug: string;
  };
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

export interface OrderItem {
  product: string;
  productName: string;
  quantity: number;
  priceAtPurchase: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  status: "pending" | "contacted" | "confirmed" | "cancelled";
  customer: string;
  items: OrderItem[];
  total: number;
  notes?: string;
  createdAt?: string;
}

export interface Customer {
  id: string;
  fullName: string;
  phone: string;
  email?: string;
  city?: string;
  address?: string;
}
