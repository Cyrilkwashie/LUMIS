import {
  Order,
  OrderAddress,
  OrderHistoryEntry,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
} from "@/lib/types";

export const EMPTY_ADDRESS: OrderAddress = {
  line1: "",
  line2: "",
  city: "",
  state: "",
  zip: "",
  country: "United States",
};

export function computeOrderTotals(
  items: OrderItem[],
  shipping = 0,
  tax = 0,
  discount = 0
) {
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const total = Math.max(0, subtotal + shipping + tax - discount);
  return { subtotal, shipping, tax, discount, total };
}

export function createHistoryEntry(
  action: string,
  note?: string,
  createdBy = "Admin"
): OrderHistoryEntry {
  return {
    id: `hist-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    action,
    note,
    createdAt: new Date().toISOString(),
    createdBy,
  };
}

export function nextOrderNumber(existingOrders: Order[]): string {
  const max = existingOrders.reduce((acc, order) => {
    const num = parseInt(order.orderNumber?.replace(/\D/g, "") || "0", 10);
    return Math.max(acc, num);
  }, 0);
  return `LUM-${String(max + 1).padStart(4, "0")}`;
}

export function nextOrderId(existingOrders: Order[]): string {
  const max = existingOrders.reduce((acc, order) => {
    const num = parseInt(order.id.replace(/\D/g, "") || "0", 10);
    return Math.max(acc, num);
  }, 0);
  return `ord-${String(max + 1).padStart(3, "0")}`;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function normalizeOrder(raw: any): Order {
  const items: OrderItem[] = (raw.items ?? []).map((item: OrderItem) => ({
    productId: item.productId,
    name: item.name,
    brand: item.brand,
    price: item.price,
    quantity: item.quantity,
    variant: item.variant,
    image: item.image ?? "",
  }));

  const { subtotal, shipping, tax, discount, total } = computeOrderTotals(
    items,
    raw.shipping ?? 0,
    raw.tax ?? 0,
    raw.discount ?? 0
  );

  const defaultAddress: OrderAddress = raw.shippingAddress ?? {
    line1: "123 Market Street",
    line2: "",
    city: "San Francisco",
    state: "CA",
    zip: "94105",
    country: "United States",
  };

  return {
    id: raw.id,
    orderNumber: raw.orderNumber ?? raw.id.toUpperCase(),
    customerName: raw.customerName ?? "",
    customerEmail: raw.customerEmail ?? "",
    customerPhone: raw.customerPhone ?? "",
    shippingAddress: { ...EMPTY_ADDRESS, ...defaultAddress },
    billingAddress: {
      ...EMPTY_ADDRESS,
      ...(raw.billingAddress ?? defaultAddress),
    },
    items,
    subtotal: raw.subtotal ?? subtotal,
    shipping: raw.shipping ?? shipping,
    tax: raw.tax ?? tax,
    discount: raw.discount ?? discount,
    total: raw.total ?? total,
    status: (raw.status as OrderStatus) ?? "pending",
    paymentStatus: (raw.paymentStatus as PaymentStatus) ?? "paid",
    paymentMethod: (raw.paymentMethod as PaymentMethod) ?? "card",
    trackingNumber: raw.trackingNumber ?? "",
    notes: raw.notes ?? "",
    internalNotes: raw.internalNotes ?? "",
    createdAt: raw.createdAt ?? new Date().toISOString(),
    updatedAt: raw.updatedAt ?? raw.createdAt ?? new Date().toISOString(),
    history: raw.history ?? [
      createHistoryEntry(
        "Order created",
        undefined,
        "System"
      ),
    ],
  };
}
