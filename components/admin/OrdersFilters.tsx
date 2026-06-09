"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { OrderStatus } from "@/lib/types";

const statuses: (OrderStatus | "all")[] = [
  "all",
  "pending",
  "processing",
  "shipped",
  "delivered",
  "cancelled",
];

const paymentStatuses = ["all", "pending", "paid", "refunded", "failed"];

export default function OrdersFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const update = (key: string, value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value && value !== "all") {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/admin/orders?${params.toString()}`);
  };

  const inputClass =
    "border border-border bg-white px-3 py-2 text-sm text-heading focus:border-accent focus:outline-none";

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      <input
        type="search"
        placeholder="Search orders..."
        defaultValue={searchParams.get("search") ?? ""}
        onChange={(e) => {
          const val = e.target.value;
          const params = new URLSearchParams(searchParams.toString());
          if (val) params.set("search", val);
          else params.delete("search");
          router.push(`/admin/orders?${params.toString()}`);
        }}
        className={`${inputClass} min-w-[200px] flex-1`}
      />

      <select
        value={searchParams.get("status") ?? "all"}
        onChange={(e) => update("status", e.target.value)}
        className={inputClass}
      >
        {statuses.map((s) => (
          <option key={s} value={s}>
            {s === "all" ? "All Statuses" : s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>

      <select
        value={searchParams.get("paymentStatus") ?? "all"}
        onChange={(e) => update("paymentStatus", e.target.value)}
        className={inputClass}
      >
        {paymentStatuses.map((s) => (
          <option key={s} value={s}>
            {s === "all" ? "All Payments" : s.charAt(0).toUpperCase() + s.slice(1)}
          </option>
        ))}
      </select>
    </div>
  );
}
