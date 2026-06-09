import { getDb } from "@/lib/db";
import { Customer, Order } from "@/lib/types";

export function getAllCustomers(): Customer[] {
  const orders = getDb().orders;
  const map = new Map<string, Customer>();

  for (const order of orders) {
    if (order.status === "cancelled") continue;

    const existing = map.get(order.customerEmail);
    const spent = order.paymentStatus === "refunded" ? 0 : order.total;

    if (existing) {
      existing.orderCount += 1;
      existing.totalSpent += spent;
      if (new Date(order.createdAt) > new Date(existing.lastOrderAt)) {
        existing.lastOrderAt = order.createdAt;
        existing.name = order.customerName;
        existing.phone = order.customerPhone;
      }
    } else {
      map.set(order.customerEmail, {
        email: order.customerEmail,
        name: order.customerName,
        phone: order.customerPhone,
        orderCount: 1,
        totalSpent: spent,
        lastOrderAt: order.createdAt,
      });
    }
  }

  return Array.from(map.values()).sort(
    (a, b) => b.totalSpent - a.totalSpent
  );
}

export function getCustomerOrders(email: string): Order[] {
  return getDb()
    .orders.filter((o) => o.customerEmail === email)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    );
}

export function getCustomerByEmail(email: string): Customer | undefined {
  return getAllCustomers().find((c) => c.email === email);
}
