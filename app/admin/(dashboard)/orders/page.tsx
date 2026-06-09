import { Suspense } from "react";
import Link from "next/link";
import AdminHeader from "@/components/admin/AdminHeader";
import OrdersTable from "@/components/admin/OrdersTable";
import OrdersFilters from "@/components/admin/OrdersFilters";
import { getAllOrders } from "@/lib/orders";
import { OrderStatus } from "@/lib/types";

type Props = {
  searchParams: {
    status?: string;
    search?: string;
    paymentStatus?: string;
  };
};

export default function AdminOrdersPage({ searchParams }: Props) {
  const orders = getAllOrders({
    status: (searchParams.status as OrderStatus | "all") ?? "all",
    search: searchParams.search,
    paymentStatus: searchParams.paymentStatus ?? "all",
  });

  return (
    <>
      <AdminHeader
        title="Orders"
        description={`${orders.length} orders`}
        action={
          <Link
            href="/admin/orders/new"
            className="bg-accent px-4 py-2 text-sm font-medium text-white hover:bg-accent/90"
          >
            Create Order
          </Link>
        }
      />

      <Suspense fallback={null}>
        <OrdersFilters />
      </Suspense>

      <OrdersTable orders={orders} />
    </>
  );
}
