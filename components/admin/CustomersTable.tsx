import Link from "next/link";
import { Customer } from "@/lib/types";

export default function CustomersTable({ customers }: { customers: Customer[] }) {
  if (!customers.length) {
    return <p className="py-16 text-center text-sm text-grey">No customers yet.</p>;
  }

  return (
    <div className="overflow-x-auto border border-border">
      <table className="w-full min-w-[720px] text-left text-sm">
        <thead>
          <tr className="border-b border-border bg-offwhite">
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">Customer</th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">Phone</th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">Orders</th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">Total Spent</th>
            <th className="px-4 py-3 text-xs font-medium uppercase tracking-widest text-grey">Last Order</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-border">
          {customers.map((customer) => (
            <tr key={customer.email} className="bg-white">
              <td className="px-4 py-4">
                <p className="font-medium text-heading">{customer.name}</p>
                <Link href={`/admin/customers?email=${encodeURIComponent(customer.email)}`} className="text-xs text-accent hover:underline">
                  {customer.email}
                </Link>
              </td>
              <td className="px-4 py-4 text-body">{customer.phone || "—"}</td>
              <td className="px-4 py-4 text-heading">{customer.orderCount}</td>
              <td className="px-4 py-4 font-medium text-heading">${customer.totalSpent.toLocaleString()}</td>
              <td className="px-4 py-4 text-grey">
                {new Date(customer.lastOrderAt).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
