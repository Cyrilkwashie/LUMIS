import AdminHeader from "@/components/admin/AdminHeader";
import DashboardCharts from "@/components/admin/DashboardCharts";
import StatCard from "@/components/admin/StatCard";
import { getAnalytics } from "@/lib/analytics";
import { getAdminStats } from "@/lib/products";

export default function AnalyticsPage() {
  const analytics = getAnalytics();
  const stats = getAdminStats();

  return (
    <>
      <AdminHeader
        title="Analytics"
        description="Sales performance and store insights."
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Total Revenue" value={`$${stats.revenue.toLocaleString()}`} />
        <StatCard label="Total Orders" value={stats.totalOrders} />
        <StatCard label="Avg Order Value" value={`$${stats.averageOrderValue}`} />
        <StatCard label="Customers" value={stats.totalCustomers} />
      </div>

      <DashboardCharts data={analytics} />
    </>
  );
}
