import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import StatCard from "@/components/admin/StatCard";
import OrdersTable from "@/components/admin/OrdersTable";
import DashboardCharts from "@/components/admin/DashboardCharts";
import { getAdminStats } from "@/lib/products";
import { getAllOrders } from "@/lib/orders";
import { getAnalytics } from "@/lib/analytics";

export default function AdminDashboardPage() {
  const stats = getAdminStats();
  const recentOrders = getAllOrders().slice(0, 5);
  const analytics = getAnalytics();

  return (
    <>
      <AdminHeader
        title="Dashboard"
        description="Store overview and performance metrics."
        action={
          <Link
            href="/admin/orders/new"
            className="bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
          >
            Create Order
          </Link>
        }
      />

      <div className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatCard label="Revenue" value={`$${stats.revenue.toLocaleString()}`} subtext="Paid orders" />
        <StatCard label="Orders" value={stats.totalOrders} subtext={`${stats.pendingOrders} pending`} />
        <StatCard label="Customers" value={stats.totalCustomers} subtext={`$${stats.averageOrderValue} avg order`} />
        <StatCard label="Products" value={stats.totalProducts} subtext={`${stats.outOfStock} out of stock`} />
      </div>

      <div className="mb-12 grid gap-4 sm:grid-cols-3">
        <StatCard label="Processing" value={stats.processingOrders} />
        <StatCard label="Shipped" value={stats.shippedOrders} />
        <StatCard label="New Arrivals" value={stats.newArrivals} />
      </div>

      <DashboardCharts data={analytics} />

      <div className="mt-12 mb-6 flex items-center justify-between">
        <h2 className="font-syne text-xl font-bold text-heading">Recent Orders</h2>
        <Link href="/admin/orders" className="text-sm text-accent hover:underline">
          View all
        </Link>
      </div>

      <OrdersTable orders={recentOrders} />
    </>
  );
}
