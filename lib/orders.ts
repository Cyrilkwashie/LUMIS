import { getDb, saveDb } from "@/lib/db";
import {
  computeOrderTotals,
  createHistoryEntry,
  nextOrderId,
  nextOrderNumber,
  normalizeOrder,
} from "@/lib/order-utils";
import { Order, OrderItem, OrderStatus } from "@/lib/types";

export type OrderFilters = {
  status?: OrderStatus | "all";
  search?: string;
  paymentStatus?: string;
  dateFrom?: string;
  dateTo?: string;
};

export function getAllOrders(filters?: OrderFilters): Order[] {
  let orders = getDb().orders.sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  if (filters?.status && filters.status !== "all") {
    orders = orders.filter((o) => o.status === filters.status);
  }

  if (filters?.paymentStatus && filters.paymentStatus !== "all") {
    orders = orders.filter((o) => o.paymentStatus === filters.paymentStatus);
  }

  if (filters?.search) {
    const q = filters.search.toLowerCase();
    orders = orders.filter(
      (o) =>
        o.orderNumber.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.customerEmail.toLowerCase().includes(q) ||
        o.id.toLowerCase().includes(q)
    );
  }

  if (filters?.dateFrom) {
    const from = new Date(filters.dateFrom).getTime();
    orders = orders.filter((o) => new Date(o.createdAt).getTime() >= from);
  }

  if (filters?.dateTo) {
    const to = new Date(filters.dateTo).getTime();
    orders = orders.filter((o) => new Date(o.createdAt).getTime() <= to);
  }

  return orders;
}

export function getOrderById(id: string): Order | undefined {
  return getDb().orders.find((o) => o.id === id);
}

export function createOrder(data: Partial<Order> & { items: OrderItem[] }): Order {
  const db = getDb();
  const itemSubtotal = data.items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const defaultShipping = itemSubtotal >= 100 ? 0 : 9.99;
  const totals = computeOrderTotals(
    data.items,
    data.shipping ?? defaultShipping,
    data.tax ?? 0,
    data.discount ?? 0
  );

  const order = normalizeOrder({
    id: nextOrderId(db.orders),
    orderNumber: nextOrderNumber(db.orders),
    customerName: data.customerName ?? "",
    customerEmail: data.customerEmail ?? "",
    customerPhone: data.customerPhone ?? "",
    shippingAddress: data.shippingAddress,
    billingAddress: data.billingAddress ?? data.shippingAddress,
    items: data.items,
    ...totals,
    status: data.status ?? "pending",
    paymentStatus: data.paymentStatus ?? "pending",
    paymentMethod: data.paymentMethod ?? "card",
    trackingNumber: data.trackingNumber ?? "",
    notes: data.notes ?? "",
    internalNotes: data.internalNotes ?? "",
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    history: [
      createHistoryEntry(
        "Order created",
        data.internalNotes ? "Manual order" : "Checkout",
        "Admin"
      ),
    ],
  });

  db.orders.push(order);
  saveDb(db);
  return order;
}

export function updateOrder(id: string, data: Partial<Order>): Order | null {
  const db = getDb();
  const index = db.orders.findIndex((o) => o.id === id);
  if (index === -1) return null;

  const existing = db.orders[index];
  const items = data.items ?? existing.items;
  const totals = computeOrderTotals(
    items,
    data.shipping ?? existing.shipping,
    data.tax ?? existing.tax,
    data.discount ?? existing.discount
  );

  const history = [...existing.history];

  if (data.status && data.status !== existing.status) {
    history.unshift(
      createHistoryEntry(
        `Status changed to ${data.status}`,
        data.trackingNumber ? `Tracking: ${data.trackingNumber}` : undefined
      )
    );
  }

  if (data.paymentStatus && data.paymentStatus !== existing.paymentStatus) {
    history.unshift(
      createHistoryEntry(`Payment status changed to ${data.paymentStatus}`)
    );
  }

  if (data.trackingNumber && data.trackingNumber !== existing.trackingNumber) {
    history.unshift(
      createHistoryEntry("Tracking number updated", data.trackingNumber)
    );
  }

  db.orders[index] = normalizeOrder({
    ...existing,
    ...data,
    ...totals,
    items,
    history,
    updatedAt: new Date().toISOString(),
  });

  saveDb(db);
  return db.orders[index];
}

export function deleteOrder(id: string): boolean {
  const db = getDb();
  const index = db.orders.findIndex((o) => o.id === id);
  if (index === -1) return false;
  db.orders.splice(index, 1);
  saveDb(db);
  return true;
}

export function updateOrderStatus(
  id: string,
  status: OrderStatus
): Order | null {
  return updateOrder(id, { status });
}
