"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Order } from "@/lib/types";
import OrderStatusBadge, { PaymentStatusBadge } from "./OrderStatusBadge";
import ActivityTimeline from "./ActivityTimeline";

export default function OrderDetail({ order }: { order: Order }) {
  const router = useRouter();

  const handleDelete = async () => {
    if (!confirm(`Delete order ${order.orderNumber}? This cannot be undone.`)) return;
    await fetch(`/api/admin/orders/${order.id}`, { method: "DELETE" });
    router.push("/admin/orders");
    router.refresh();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap gap-3">
        <Link
          href={`/admin/orders/${order.id}/edit`}
          className="bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
        >
          Edit Order
        </Link>
        <button
          type="button"
          onClick={handleDelete}
          className="border border-border px-4 py-2 text-sm text-grey hover:border-heading hover:text-heading"
        >
          Delete Order
        </button>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="border border-border bg-white p-6">
            <div className="flex items-start justify-between">
              <h2 className="font-syne text-lg font-bold text-heading">Items</h2>
              <span className="text-sm text-grey">
                {order.items.reduce((s, i) => s + i.quantity, 0)} items
              </span>
            </div>
            <ul className="mt-4 divide-y divide-border">
              {order.items.map((item, i) => (
                <li key={i} className="flex justify-between py-4 text-sm">
                  <div>
                    <p className="font-medium text-heading">{item.name}</p>
                    <p className="text-xs text-grey">
                      {item.brand} · {item.variant} · Qty {item.quantity}
                    </p>
                    <p className="text-xs text-grey">${item.price.toLocaleString()} each</p>
                  </div>
                  <p className="font-medium text-heading">
                    ${(item.price * item.quantity).toLocaleString()}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="border border-border bg-white p-6">
              <h2 className="font-syne text-lg font-bold text-heading">Shipping</h2>
              <address className="mt-4 text-sm not-italic leading-relaxed text-body">
                {order.customerName}<br />
                {order.shippingAddress.line1}<br />
                {order.shippingAddress.line2 && <>{order.shippingAddress.line2}<br /></>}
                {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.zip}<br />
                {order.shippingAddress.country}
              </address>
            </div>
            <div className="border border-border bg-white p-6">
              <h2 className="font-syne text-lg font-bold text-heading">Billing</h2>
              <address className="mt-4 text-sm not-italic leading-relaxed text-body">
                {order.billingAddress.line1}<br />
                {order.billingAddress.line2 && <>{order.billingAddress.line2}<br /></>}
                {order.billingAddress.city}, {order.billingAddress.state} {order.billingAddress.zip}<br />
                {order.billingAddress.country}
              </address>
            </div>
          </div>

          {(order.notes || order.internalNotes) && (
            <div className="border border-border bg-white p-6">
              <h2 className="font-syne text-lg font-bold text-heading">Notes</h2>
              {order.notes && (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-widest text-grey">Customer</p>
                  <p className="mt-1 text-sm text-body">{order.notes}</p>
                </div>
              )}
              {order.internalNotes && (
                <div className="mt-4">
                  <p className="text-xs uppercase tracking-widest text-grey">Internal</p>
                  <p className="mt-1 text-sm text-body">{order.internalNotes}</p>
                </div>
              )}
            </div>
          )}

          <div className="border border-border bg-white p-6">
            <h2 className="font-syne text-lg font-bold text-heading">Activity</h2>
            <div className="mt-4">
              <ActivityTimeline entries={order.history} />
            </div>
          </div>
        </div>

        <aside className="space-y-6">
          <div className="border border-border bg-white p-6">
            <h2 className="font-syne text-lg font-bold text-heading">Order Info</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-grey">Order #</dt>
                <dd className="font-medium text-heading">{order.orderNumber}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-grey">Status</dt>
                <dd><OrderStatusBadge status={order.status} /></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-grey">Payment</dt>
                <dd><PaymentStatusBadge status={order.paymentStatus} /></dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-grey">Method</dt>
                <dd className="capitalize text-heading">{order.paymentMethod.replace("_", " ")}</dd>
              </div>
              {order.trackingNumber && (
                <div className="flex justify-between">
                  <dt className="text-grey">Tracking</dt>
                  <dd className="text-heading">{order.trackingNumber}</dd>
                </div>
              )}
              <div className="flex justify-between">
                <dt className="text-grey">Placed</dt>
                <dd className="text-heading">
                  {new Date(order.createdAt).toLocaleDateString()}
                </dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-grey">Updated</dt>
                <dd className="text-heading">
                  {new Date(order.updatedAt).toLocaleDateString()}
                </dd>
              </div>
            </dl>
          </div>

          <div className="border border-border bg-white p-6">
            <h2 className="font-syne text-lg font-bold text-heading">Customer</h2>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-grey">Name</dt>
                <dd className="text-heading">{order.customerName}</dd>
              </div>
              <div>
                <dt className="text-grey">Email</dt>
                <dd>
                  <Link href={`/admin/customers?email=${encodeURIComponent(order.customerEmail)}`} className="text-accent hover:underline">
                    {order.customerEmail}
                  </Link>
                </dd>
              </div>
              {order.customerPhone && (
                <div>
                  <dt className="text-grey">Phone</dt>
                  <dd className="text-heading">{order.customerPhone}</dd>
                </div>
              )}
            </dl>
          </div>

          <div className="border border-border bg-white p-6">
            <h2 className="font-syne text-lg font-bold text-heading">Summary</h2>
            <dl className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-grey">Subtotal</dt>
                <dd className="text-heading">${order.subtotal.toLocaleString()}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-grey">Shipping</dt>
                <dd className="text-heading">
                  {order.shipping === 0 ? "Free" : `$${order.shipping.toFixed(2)}`}
                </dd>
              </div>
              {order.tax > 0 && (
                <div className="flex justify-between">
                  <dt className="text-grey">Tax</dt>
                  <dd className="text-heading">${order.tax.toFixed(2)}</dd>
                </div>
              )}
              {order.discount > 0 && (
                <div className="flex justify-between">
                  <dt className="text-grey">Discount</dt>
                  <dd className="text-heading">-${order.discount.toFixed(2)}</dd>
                </div>
              )}
              <div className="flex justify-between border-t border-border pt-3">
                <dt className="font-medium text-heading">Total</dt>
                <dd className="font-bold text-heading">${order.total.toLocaleString()}</dd>
              </div>
            </dl>
          </div>
        </aside>
      </div>
    </div>
  );
}
