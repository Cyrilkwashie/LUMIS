export type Category =
  | "Phones"
  | "Laptops"
  | "Gaming"
  | "Audio"
  | "Wearables"
  | "Accessories";

export type ProductVariant = {
  id: string;
  label: string;
  priceModifier?: number;
};

export type Product = {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number;
  slug: string;
  description: string;
  specs: Record<string, string>;
  images: string[];
  variants: ProductVariant[];
  isNew?: boolean;
  inStock?: boolean;
  stockCount?: number;
};

export type CartItem = {
  productId: string;
  slug: string;
  name: string;
  brand: string;
  price: number;
  image: string;
  variant: string;
  quantity: number;
};

export type OrderStatus =
  | "pending"
  | "processing"
  | "shipped"
  | "delivered"
  | "cancelled";

export type PaymentStatus = "pending" | "paid" | "refunded" | "failed";

export type PaymentMethod = "card" | "paypal" | "apple_pay" | "manual";

export type OrderAddress = {
  line1: string;
  line2?: string;
  city: string;
  state: string;
  zip: string;
  country: string;
};

export type OrderItem = {
  productId: string;
  name: string;
  brand: string;
  price: number;
  quantity: number;
  variant: string;
  image?: string;
};

export type OrderHistoryEntry = {
  id: string;
  action: string;
  note?: string;
  createdAt: string;
  createdBy: string;
};

export type Order = {
  id: string;
  orderNumber: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  shippingAddress: OrderAddress;
  billingAddress: OrderAddress;
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  discount: number;
  total: number;
  status: OrderStatus;
  paymentStatus: PaymentStatus;
  paymentMethod: PaymentMethod;
  trackingNumber: string;
  notes: string;
  internalNotes: string;
  createdAt: string;
  updatedAt: string;
  history: OrderHistoryEntry[];
};

export type Customer = {
  email: string;
  name: string;
  phone: string;
  orderCount: number;
  totalSpent: number;
  lastOrderAt: string;
};

export type HomepageFeatured = {
  productId: string;
  imageFirst: boolean;
};

export type Database = {
  products: Product[];
  orders: Order[];
  homepageFeatured: HomepageFeatured[];
};

export type AdminStats = {
  totalProducts: number;
  totalOrders: number;
  revenue: number;
  pendingOrders: number;
  processingOrders: number;
  shippedOrders: number;
  outOfStock: number;
  newArrivals: number;
  averageOrderValue: number;
  totalCustomers: number;
};

export type AnalyticsData = {
  revenueByMonth: { month: string; revenue: number; orders: number }[];
  ordersByStatus: { status: OrderStatus; count: number }[];
  topProducts: { name: string; quantity: number; revenue: number }[];
  recentActivity: OrderHistoryEntry[];
};
