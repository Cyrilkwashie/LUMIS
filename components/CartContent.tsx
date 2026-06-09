"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import PageWrapper from "@/components/PageWrapper";
import Button from "@/components/Button";
import { useCart } from "@/lib/cart-context";

export default function CartContent() {
  const { items, subtotal, removeItem, updateQuantity, clearCart } = useCart();
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkingOut, setCheckingOut] = useState(false);
  const [orderComplete, setOrderComplete] = useState<string | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    line1: "",
    city: "",
    state: "",
    zip: "",
    notes: "",
  });

  const shipping = subtotal >= 100 ? 0 : 9.99;
  const total = subtotal + shipping;

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    setCheckingOut(true);

    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        customerName: form.name,
        customerEmail: form.email,
        customerPhone: form.phone,
        notes: form.notes,
        shippingAddress: {
          line1: form.line1,
          city: form.city,
          state: form.state,
          zip: form.zip,
          country: "United States",
        },
        items: items.map((item) => ({
          productId: item.productId,
          name: item.name,
          brand: item.brand,
          price: item.price,
          quantity: item.quantity,
          variant: item.variant,
          image: item.image,
        })),
      }),
    });

    if (res.ok) {
      const order = await res.json();
      clearCart();
      setOrderComplete(order.orderNumber);
      setCheckoutOpen(false);
    }

    setCheckingOut(false);
  };

  if (items.length === 0) {
    return (
      <PageWrapper>
        <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-28">
          <h1 className="font-syne text-3xl font-bold text-heading">
            Your cart is empty
          </h1>
          <p className="mt-4 text-sm text-grey">
            Discover our curated collection of premium technology.
          </p>
          <Button href="/shop" className="mt-8">
            Continue Shopping
          </Button>
        </section>
      </PageWrapper>
    );
  }

  if (orderComplete) {
    return (
      <PageWrapper>
        <section className="flex min-h-[60vh] flex-col items-center justify-center px-6 pt-28 text-center">
          <h1 className="font-syne text-3xl font-bold text-heading">Order Placed</h1>
          <p className="mt-4 text-sm text-body">
            Thank you. Your order <strong>{orderComplete}</strong> has been received.
          </p>
          <Button href="/shop" className="mt-8">Continue Shopping</Button>
        </section>
      </PageWrapper>
    );
  }

  return (
    <PageWrapper>
      <section className="px-6 pb-section pt-28">
        <div className="mx-auto max-w-7xl">
          <h1 className="mb-12 font-syne text-4xl font-bold text-heading">
            Cart
          </h1>

          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2">
              <div className="hidden border-b border-border pb-4 md:grid md:grid-cols-[80px_1fr_120px_80px_40px] md:gap-4">
                <span />
                <span className="text-xs uppercase tracking-widest text-grey">
                  Product
                </span>
                <span className="text-xs uppercase tracking-widest text-grey">
                  Quantity
                </span>
                <span className="text-right text-xs uppercase tracking-widest text-grey">
                  Price
                </span>
                <span />
              </div>

              <ul className="divide-y divide-border">
                {items.map((item) => (
                  <li
                    key={`${item.productId}-${item.variant}`}
                    className="py-6 md:grid md:grid-cols-[80px_1fr_120px_80px_40px] md:items-center md:gap-4"
                  >
                    <div className="flex gap-4 md:contents">
                      <div className="relative h-20 w-20 shrink-0 overflow-hidden bg-offwhite">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                          sizes="80px"
                        />
                      </div>

                      <div className="flex-1">
                        <Link
                          href={`/shop/${item.slug}`}
                          className="font-syne text-sm font-medium text-heading hover:underline"
                        >
                          {item.name}
                        </Link>
                        <p className="mt-1 text-xs text-grey">{item.brand}</p>
                        <p className="mt-1 text-xs text-grey">{item.variant}</p>

                        <div className="mt-4 flex items-center justify-between md:hidden">
                          <div className="inline-flex items-center border border-border">
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.variant,
                                  item.quantity - 1
                                )
                              }
                              className="px-3 py-1.5 text-heading"
                              aria-label="Decrease quantity"
                            >
                              –
                            </button>
                            <span className="w-8 text-center text-sm">
                              {item.quantity}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                updateQuantity(
                                  item.productId,
                                  item.variant,
                                  item.quantity + 1
                                )
                              }
                              className="px-3 py-1.5 text-heading"
                              aria-label="Increase quantity"
                            >
                              +
                            </button>
                          </div>
                          <p className="text-sm font-medium text-heading">
                            ${(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="hidden md:block">
                      <div className="inline-flex items-center border border-border">
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variant,
                              item.quantity - 1
                            )
                          }
                          className="px-3 py-1.5 text-heading hover:bg-offwhite"
                          aria-label="Decrease quantity"
                        >
                          –
                        </button>
                        <span className="w-8 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          onClick={() =>
                            updateQuantity(
                              item.productId,
                              item.variant,
                              item.quantity + 1
                            )
                          }
                          className="px-3 py-1.5 text-heading hover:bg-offwhite"
                          aria-label="Increase quantity"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    <p className="hidden text-right text-sm font-medium text-heading md:block">
                      ${(item.price * item.quantity).toLocaleString()}
                    </p>

                    <button
                      type="button"
                      onClick={() =>
                        removeItem(item.productId, item.variant)
                      }
                      className="mt-4 text-grey hover:text-heading md:mt-0"
                      aria-label="Remove item"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            <aside className="border border-border p-8 h-fit">
              <h2 className="font-syne text-lg font-bold text-heading">
                Order Summary
              </h2>

              <dl className="mt-6 space-y-4">
                <div className="flex justify-between text-sm">
                  <dt className="text-grey">Subtotal</dt>
                  <dd className="text-heading">
                    ${subtotal.toLocaleString()}
                  </dd>
                </div>
                <div className="flex justify-between text-sm">
                  <dt className="text-grey">Estimated Shipping</dt>
                  <dd className="text-heading">
                    {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                  </dd>
                </div>
                {subtotal < 100 && (
                  <p className="text-xs text-grey">
                    Free shipping on orders over $100
                  </p>
                )}
                <div className="flex justify-between border-t border-border pt-4">
                  <dt className="font-medium text-heading">Total</dt>
                  <dd className="font-bold text-heading">
                    ${total.toLocaleString(undefined, {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                    })}
                  </dd>
                </div>
              </dl>

              {!checkoutOpen ? (
                <Button className="mt-8 w-full" onClick={() => setCheckoutOpen(true)}>
                  Proceed to Checkout
                </Button>
              ) : (
                <form onSubmit={handleCheckout} className="mt-8 space-y-3">
                  <input
                    required
                    placeholder="Full name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <input
                    required
                    type="email"
                    placeholder="Email"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <input
                    placeholder="Phone"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <input
                    required
                    placeholder="Address"
                    value={form.line1}
                    onChange={(e) => setForm({ ...form, line1: e.target.value })}
                    className="w-full border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none"
                  />
                  <div className="grid grid-cols-3 gap-2">
                    <input
                      required
                      placeholder="City"
                      value={form.city}
                      onChange={(e) => setForm({ ...form, city: e.target.value })}
                      className="border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none"
                    />
                    <input
                      required
                      placeholder="State"
                      value={form.state}
                      onChange={(e) => setForm({ ...form, state: e.target.value })}
                      className="border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none"
                    />
                    <input
                      required
                      placeholder="ZIP"
                      value={form.zip}
                      onChange={(e) => setForm({ ...form, zip: e.target.value })}
                      className="border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none"
                    />
                  </div>
                  <textarea
                    placeholder="Order notes (optional)"
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    className="w-full resize-none border border-border px-3 py-2 text-sm focus:border-accent focus:outline-none"
                    rows={2}
                  />
                  <Button type="submit" className="w-full" disabled={checkingOut}>
                    {checkingOut ? "Placing Order..." : `Place Order — $${total.toFixed(2)}`}
                  </Button>
                  <button
                    type="button"
                    onClick={() => setCheckoutOpen(false)}
                    className="w-full text-sm text-grey hover:text-heading"
                  >
                    Cancel
                  </button>
                </form>
              )}
            </aside>
          </div>
        </div>
      </section>
    </PageWrapper>
  );
}
