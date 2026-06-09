"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import {
  Order,
  OrderAddress,
  OrderItem,
  OrderStatus,
  PaymentMethod,
  PaymentStatus,
  Product,
} from "@/lib/types";
import { EMPTY_ADDRESS } from "@/lib/order-utils";

type OrderFormProps = {
  order?: Order;
  products: Product[];
  mode: "create" | "edit";
};

const inputClass =
  "w-full border border-border bg-white px-3 py-2 text-sm text-heading focus:border-accent focus:outline-none";
const labelClass =
  "mb-1.5 block text-xs font-medium uppercase tracking-widest text-grey";

export default function OrderForm({ order, products, mode }: OrderFormProps) {
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const [customerName, setCustomerName] = useState(order?.customerName ?? "");
  const [customerEmail, setCustomerEmail] = useState(order?.customerEmail ?? "");
  const [customerPhone, setCustomerPhone] = useState(order?.customerPhone ?? "");
  const [status, setStatus] = useState<OrderStatus>(order?.status ?? "pending");
  const [paymentStatus, setPaymentStatus] = useState<PaymentStatus>(
    order?.paymentStatus ?? "pending"
  );
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>(
    order?.paymentMethod ?? "card"
  );
  const [trackingNumber, setTrackingNumber] = useState(order?.trackingNumber ?? "");
  const [notes, setNotes] = useState(order?.notes ?? "");
  const [internalNotes, setInternalNotes] = useState(order?.internalNotes ?? "");
  const [shipping, setShipping] = useState(order?.shipping?.toString() ?? "0");
  const [tax, setTax] = useState(order?.tax?.toString() ?? "0");
  const [discount, setDiscount] = useState(order?.discount?.toString() ?? "0");

  const [shippingAddress, setShippingAddress] = useState<OrderAddress>(
    order?.shippingAddress ?? { ...EMPTY_ADDRESS }
  );
  const [billingAddress, setBillingAddress] = useState<OrderAddress>(
    order?.billingAddress ?? { ...EMPTY_ADDRESS }
  );
  const [sameAsShipping, setSameAsShipping] = useState(true);

  const [items, setItems] = useState<OrderItem[]>(
    order?.items ?? [
      { productId: "", name: "", brand: "", price: 0, quantity: 1, variant: "" },
    ]
  );

  const subtotal = useMemo(
    () => items.reduce((s, i) => s + i.price * i.quantity, 0),
    [items]
  );

  const total = useMemo(
    () =>
      Math.max(
        0,
        subtotal +
          Number(shipping || 0) +
          Number(tax || 0) -
          Number(discount || 0)
      ),
    [subtotal, shipping, tax, discount]
  );

  const updateItem = (index: number, field: keyof OrderItem, value: string | number) => {
    setItems((prev) => {
      const next = [...prev];
      next[index] = { ...next[index], [field]: value };
      return next;
    });
  };

  const selectProduct = (index: number, productId: string) => {
    const product = products.find((p) => p.id === productId);
    if (!product) return;
    setItems((prev) => {
      const next = [...prev];
      next[index] = {
        productId: product.id,
        name: product.name,
        brand: product.brand,
        price: product.price,
        quantity: next[index].quantity || 1,
        variant: product.variants[0]?.label ?? "Standard",
        image: product.images[0],
      };
      return next;
    });
  };

  const addItem = () => {
    setItems((prev) => [
      ...prev,
      { productId: "", name: "", brand: "", price: 0, quantity: 1, variant: "" },
    ]);
  };

  const removeItem = (index: number) => {
    setItems((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    const validItems = items.filter((i) => i.productId && i.name);
    if (!validItems.length) {
      setError("Add at least one product.");
      setSaving(false);
      return;
    }

    const payload = {
      customerName,
      customerEmail,
      customerPhone,
      shippingAddress,
      billingAddress: sameAsShipping ? shippingAddress : billingAddress,
      items: validItems,
      subtotal,
      shipping: Number(shipping),
      tax: Number(tax),
      discount: Number(discount),
      total,
      status,
      paymentStatus,
      paymentMethod,
      trackingNumber,
      notes,
      internalNotes,
    };

    const url =
      mode === "create"
        ? "/api/admin/orders"
        : `/api/admin/orders/${order!.id}`;
    const method = mode === "create" ? "POST" : "PUT";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      setError("Failed to save order.");
      setSaving(false);
      return;
    }

    const saved = await res.json();
    router.push(`/admin/orders/${saved.id}`);
    router.refresh();
  };

  const AddressFields = ({
    address,
    setAddress,
  }: {
    address: OrderAddress;
    setAddress: (a: OrderAddress) => void;
  }) => (
    <div className="grid gap-4 sm:grid-cols-2">
      <div className="sm:col-span-2">
        <label className={labelClass}>Address Line 1</label>
        <input
          className={inputClass}
          value={address.line1}
          onChange={(e) => setAddress({ ...address, line1: e.target.value })}
        />
      </div>
      <div className="sm:col-span-2">
        <label className={labelClass}>Address Line 2</label>
        <input
          className={inputClass}
          value={address.line2 ?? ""}
          onChange={(e) => setAddress({ ...address, line2: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>City</label>
        <input
          className={inputClass}
          value={address.city}
          onChange={(e) => setAddress({ ...address, city: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>State</label>
        <input
          className={inputClass}
          value={address.state}
          onChange={(e) => setAddress({ ...address, state: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>ZIP</label>
        <input
          className={inputClass}
          value={address.zip}
          onChange={(e) => setAddress({ ...address, zip: e.target.value })}
        />
      </div>
      <div>
        <label className={labelClass}>Country</label>
        <input
          className={inputClass}
          value={address.country}
          onChange={(e) => setAddress({ ...address, country: e.target.value })}
        />
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {error && <p className="text-sm text-red-600">{error}</p>}

      <section className="border border-border bg-white p-6">
        <h2 className="font-syne text-lg font-bold text-heading">Customer</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-3">
          <div>
            <label className={labelClass}>Name</label>
            <input className={inputClass} value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input className={inputClass} type="email" value={customerEmail} onChange={(e) => setCustomerEmail(e.target.value)} required />
          </div>
          <div>
            <label className={labelClass}>Phone</label>
            <input className={inputClass} value={customerPhone} onChange={(e) => setCustomerPhone(e.target.value)} />
          </div>
        </div>
      </section>

      <section className="border border-border bg-white p-6">
        <h2 className="font-syne text-lg font-bold text-heading">Line Items</h2>
        <div className="mt-4 space-y-4">
          {items.map((item, index) => (
            <div key={index} className="grid gap-3 border border-border p-4 sm:grid-cols-6">
              <div className="sm:col-span-2">
                <label className={labelClass}>Product</label>
                <select
                  className={inputClass}
                  value={item.productId}
                  onChange={(e) => selectProduct(index, e.target.value)}
                >
                  <option value="">Select product</option>
                  {products.map((p) => (
                    <option key={p.id} value={p.id}>
                      {p.name} — ${p.price}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className={labelClass}>Variant</label>
                <input className={inputClass} value={item.variant} onChange={(e) => updateItem(index, "variant", e.target.value)} />
              </div>
              <div>
                <label className={labelClass}>Price</label>
                <input className={inputClass} type="number" min="0" step="0.01" value={item.price} onChange={(e) => updateItem(index, "price", Number(e.target.value))} />
              </div>
              <div>
                <label className={labelClass}>Qty</label>
                <input className={inputClass} type="number" min="1" value={item.quantity} onChange={(e) => updateItem(index, "quantity", Number(e.target.value))} />
              </div>
              <div className="flex items-end">
                <button type="button" onClick={() => removeItem(index)} className="text-sm text-grey hover:text-heading">
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
        <button type="button" onClick={addItem} className="mt-4 text-sm text-accent hover:underline">
          + Add item
        </button>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="border border-border bg-white p-6">
          <h2 className="font-syne text-lg font-bold text-heading">Shipping Address</h2>
          <div className="mt-4">
            <AddressFields address={shippingAddress} setAddress={setShippingAddress} />
          </div>
        </div>
        <div className="border border-border bg-white p-6">
          <div className="flex items-center justify-between">
            <h2 className="font-syne text-lg font-bold text-heading">Billing Address</h2>
            <label className="flex items-center gap-2 text-xs text-grey">
              <input type="checkbox" checked={sameAsShipping} onChange={(e) => setSameAsShipping(e.target.checked)} />
              Same as shipping
            </label>
          </div>
          {!sameAsShipping && (
            <div className="mt-4">
              <AddressFields address={billingAddress} setAddress={setBillingAddress} />
            </div>
          )}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-2">
        <div className="border border-border bg-white p-6">
          <h2 className="font-syne text-lg font-bold text-heading">Fulfillment</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Order Status</label>
              <select className={inputClass} value={status} onChange={(e) => setStatus(e.target.value as OrderStatus)}>
                {(["pending", "processing", "shipped", "delivered", "cancelled"] as OrderStatus[]).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Payment Status</label>
              <select className={inputClass} value={paymentStatus} onChange={(e) => setPaymentStatus(e.target.value as PaymentStatus)}>
                {(["pending", "paid", "refunded", "failed"] as PaymentStatus[]).map((s) => (
                  <option key={s} value={s}>{s}</option>
                ))}
              </select>
            </div>
            <div>
              <label className={labelClass}>Payment Method</label>
              <select className={inputClass} value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value as PaymentMethod)}>
                <option value="card">Card</option>
                <option value="paypal">PayPal</option>
                <option value="apple_pay">Apple Pay</option>
                <option value="manual">Manual</option>
              </select>
            </div>
            <div>
              <label className={labelClass}>Tracking Number</label>
              <input className={inputClass} value={trackingNumber} onChange={(e) => setTrackingNumber(e.target.value)} placeholder="1Z999AA10123456784" />
            </div>
          </div>
        </div>

        <div className="border border-border bg-white p-6">
          <h2 className="font-syne text-lg font-bold text-heading">Totals</h2>
          <div className="mt-4 grid gap-4 sm:grid-cols-2">
            <div>
              <label className={labelClass}>Subtotal</label>
              <input className={inputClass} value={`$${subtotal.toLocaleString()}`} readOnly />
            </div>
            <div>
              <label className={labelClass}>Shipping ($)</label>
              <input className={inputClass} type="number" min="0" step="0.01" value={shipping} onChange={(e) => setShipping(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Tax ($)</label>
              <input className={inputClass} type="number" min="0" step="0.01" value={tax} onChange={(e) => setTax(e.target.value)} />
            </div>
            <div>
              <label className={labelClass}>Discount ($)</label>
              <input className={inputClass} type="number" min="0" step="0.01" value={discount} onChange={(e) => setDiscount(e.target.value)} />
            </div>
            <div className="sm:col-span-2">
              <label className={labelClass}>Total</label>
              <input className={`${inputClass} font-bold`} value={`$${total.toLocaleString()}`} readOnly />
            </div>
          </div>
        </div>
      </section>

      <section className="border border-border bg-white p-6">
        <h2 className="font-syne text-lg font-bold text-heading">Notes</h2>
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Customer Notes</label>
            <textarea className={`${inputClass} min-h-[80px] resize-y`} value={notes} onChange={(e) => setNotes(e.target.value)} />
          </div>
          <div>
            <label className={labelClass}>Internal Notes</label>
            <textarea className={`${inputClass} min-h-[80px] resize-y`} value={internalNotes} onChange={(e) => setInternalNotes(e.target.value)} />
          </div>
        </div>
      </section>

      <div className="flex gap-3">
        <button type="submit" disabled={saving} className="bg-accent px-6 py-2.5 text-sm font-medium text-white hover:bg-accent/90 disabled:opacity-50">
          {saving ? "Saving..." : mode === "create" ? "Create Order" : "Save Changes"}
        </button>
        <button type="button" onClick={() => router.back()} className="border border-border px-6 py-2.5 text-sm text-body hover:border-heading">
          Cancel
        </button>
      </div>
    </form>
  );
}
