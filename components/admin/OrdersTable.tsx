"use client";

import Link from "next/link";
import { Order } from "@/lib/types";
import OrderStatusBadge, { PaymentStatusBadge } from "./OrderStatusBadge";

type OrdersTableProps = {
  orders: Order[];
  showCustomer?: boolean;
};

export default function OrdersTable({
  orders,
  showCustomer = true,
}: OrdersTableProps) {
  if (orders.length === 0) {
    return (
      <p className="py-16 text-center text-sm text-grey">No orders found.</p>
    );
  }

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[900px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-offwhite">
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Order
            </th>
            {showCustomer && (
              <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
                Customer
              </th>
            )}
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Items
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Total
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Payment
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Status
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Date
            </th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {orders.map((order) => (
            <tr key={order.id} className="bg-white">
              <td className="px-4 py-4">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="font-medium text-accent hover:underline"
                >
                  {order.orderNumber}
                </Link>
                <p className="text-xs text-grey">{order.id}</p>
              </td>
              {showCustomer && (
                <td className="px-4 py-4">
                  <p className="text-heading">{order.customerName}</p>
                  <p className="text-xs text-grey">{order.customerEmail}</p>
                </td>
              )}
              <td className="px-4 py-4 text-body">
                {order.items.reduce((s, i) => s + i.quantity, 0)} items
              </td>
              <td className="px-4 py-4 font-medium text-heading">
                ${order.total.toLocaleString()}
              </td>
              <td className="px-4 py-4">
                <PaymentStatusBadge status={order.paymentStatus} />
              </td>
              <td className="px-4 py-4">
                <OrderStatusBadge status={order.status} />
              </td>
              <td className="px-4 py-4 text-grey">
                {new Date(order.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </td>
              <td className="px-4 py-4">
                <div className="flex gap-3">
                  <Link
                    href={`/admin/orders/${order.id}`}
                    className="text-sm text-accent hover:underline"
                  >
                    View
                  </Link>
                  <Link
                    href={`/admin/orders/${order.id}/edit`}
                    className="text-sm text-body hover:text-heading"
                  >
                    Edit
                  </Link>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
