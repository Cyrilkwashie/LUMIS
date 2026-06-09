import { getDb } from "@/lib/db";
import { AnalyticsData, OrderStatus } from "@/lib/types";

const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

export function getAnalytics(): AnalyticsData {
  const db = getDb();
  const orders = db.orders.filter((o) => o.status !== "cancelled");

  const revenueByMonthMap = new Map<string, { revenue: number; orders: number }>();

  for (let i = 5; i >= 0; i--) {
    const d = new Date();
    d.setMonth(d.getMonth() - i);
    const key = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    revenueByMonthMap.set(key, { revenue: 0, orders: 0 });
  }

  for (const order of orders) {
    const d = new Date(order.createdAt);
    const key = `${MONTHS[d.getMonth()]} ${d.getFullYear()}`;
    if (revenueByMonthMap.has(key)) {
      const entry = revenueByMonthMap.get(key)!;
      entry.revenue += order.paymentStatus === "paid" ? order.total : 0;
      entry.orders += 1;
    }
  }

  const revenueByMonth = Array.from(revenueByMonthMap.entries()).map(
    ([month, data]) => ({ month, ...data })
  );

  const statuses: OrderStatus[] = [
    "pending",
    "processing",
    "shipped",
    "delivered",
    "cancelled",
  ];

  const ordersByStatus = statuses.map((status) => ({
    status,
    count: db.orders.filter((o) => o.status === status).length,
  }));

  const productMap = new Map<string, { quantity: number; revenue: number }>();

  for (const order of orders) {
    for (const item of order.items) {
      const existing = productMap.get(item.name) ?? { quantity: 0, revenue: 0 };
      existing.quantity += item.quantity;
      existing.revenue += item.price * item.quantity;
      productMap.set(item.name, existing);
    }
  }

  const topProducts = Array.from(productMap.entries())
    .map(([name, data]) => ({ name, ...data }))
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  const recentActivity = db.orders
    .flatMap((o) => o.history)
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
    )
    .slice(0, 10);

  return { revenueByMonth, ordersByStatus, topProducts, recentActivity };
}
