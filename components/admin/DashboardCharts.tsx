import { AnalyticsData } from "@/lib/types";
import OrderStatusBadge from "./OrderStatusBadge";

export default function DashboardCharts({ data }: { data: AnalyticsData }) {
  const maxRevenue = Math.max(...data.revenueByMonth.map((m) => m.revenue), 1);

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="border border-border bg-white p-6">
        <h2 className="font-syne text-lg font-bold text-heading">
          Revenue (6 months)
        </h2>
        <div className="mt-6 flex h-48 items-end gap-3">
          {data.revenueByMonth.map((month) => (
            <div key={month.month} className="flex flex-1 flex-col items-center gap-2">
              <span className="text-xs font-medium text-heading">
                ${month.revenue >= 1000
                  ? `${(month.revenue / 1000).toFixed(1)}k`
                  : month.revenue}
              </span>
              <div
                className="w-full bg-accent transition-all"
                style={{
                  height: `${Math.max((month.revenue / maxRevenue) * 100, 4)}%`,
                  minHeight: "4px",
                }}
              />
              <span className="text-[10px] text-grey">{month.month.split(" ")[0]}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-border bg-white p-6">
        <h2 className="font-syne text-lg font-bold text-heading">
          Orders by Status
        </h2>
        <ul className="mt-6 space-y-3">
          {data.ordersByStatus.map((item) => (
            <li key={item.status} className="flex items-center justify-between">
              <OrderStatusBadge status={item.status} />
              <span className="font-medium text-heading">{item.count}</span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-border bg-white p-6">
        <h2 className="font-syne text-lg font-bold text-heading">Top Products</h2>
        <ul className="mt-6 divide-y divide-border">
          {data.topProducts.map((product, i) => (
            <li key={product.name} className="flex justify-between py-3 text-sm">
              <div>
                <span className="mr-2 text-grey">{i + 1}.</span>
                <span className="text-heading">{product.name}</span>
                <span className="ml-2 text-xs text-grey">
                  {product.quantity} sold
                </span>
              </div>
              <span className="font-medium text-heading">
                ${product.revenue.toLocaleString()}
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="border border-border bg-white p-6">
        <h2 className="font-syne text-lg font-bold text-heading">
          Recent Activity
        </h2>
        <ul className="mt-6 space-y-3">
          {data.recentActivity.slice(0, 6).map((entry) => (
            <li key={entry.id} className="text-sm">
              <p className="text-heading">{entry.action}</p>
              <p className="text-xs text-grey">
                {entry.createdBy} ·{" "}
                {new Date(entry.createdAt).toLocaleDateString()}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
